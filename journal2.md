## segregating concerns to keep app clean and maintainable

1. custom hooks - holds the logic
   - all states
   - all functions
   - returns
2. Context- just distributes the values
   - calls the hook
   - passes the returned values into the Provider
   - no logic here, just pipe
3. Layout- just wires it together
   - renders the provider
   - no state, no logic
4. Components- just consumes
   - dumb
   - ui only

# After auth system and modelling...

### Create DayContext

- returns day Id and current date
- day id is in state because the app will react to it being changed. if dayId changed, re-render everything that depends on it.

### Create TaskContext

- returns day Id, current date and category
- In the dashboard page, I used link, this link on click will create the url- dashboard/body or dashboard/mind or dashboard/wealth
- The link will send the user to task form
- at taskForm, i captured the category from the link, dashboard/`body`, using params.
- Params is a promise, so the category page has to be server side component
- params.category will give me the category for the tasks.
- This is called `Dynamic Routing`
  - `[category]/page.tsx` handles `/dashboard/mind, /dashboard/body, /dashboard/wealth`
  - Static routes take priority over dynamic ones — /`dashboard/allTasks` won't be caught by [category]
  - Only one dynamic segment per folder level, unlimited static ones
  - Route params are for frontend navigation, not API calls

- `Data Flow`
  - `Route params` → params.category (frontend to frontend)
  - `Query params` → axios.get("/api/tasks", { params: { dayId } }) (frontend to API)
  - Template literal ?key=value and params object do the same thing — prefer params object

### Create custom hooks for tasks

# Dev Log

## DB as Source of Truth — Task List Management

### The Problem

Early implementation managed task list state manually. After every CRUD operation, state was updated by hand using functions like `addToTaskList`, `deleteFromTaskList`, `editTaskInTaskList`, and `toggleTaskInTaskList`. This approach came from tutorial React where there is no backend, so state has to be the source of truth.

With a real database, this is unnecessary and error-prone. The DB is always the most accurate representation of data, so there is no point maintaining a parallel copy in state.

### New Approach

After every CRUD operation (add, delete, update, toggle), just call `fetchTasks` to refetch the updated list from the DB. The API handles all data mutations, the frontend just displays whatever the DB returns.

```
User action → API updates DB → fetchTasks → setAllTasks → UI reflects DB
```

This means:

- No manual state updates after mutations
- No risk of state getting out of sync with DB
- Significantly less code — all manual list update functions were deleted
- Single `fetchTasks` function replaces all of them

### Tradeoff

There is a slight delay after each operation since we wait for the DB and then refetch. This is acceptable for a personal productivity app. Optimistic updates (updating state before DB confirms) can be added later as a polish item if the delay becomes noticeable.

### Future

React Query in the rebuild will handle this pattern natively with built-in caching and automatic refetching.

---

## Separating useTask and useTaskList

### The Problem

Originally, all task logic lived in a single `useTask` hook — fetching the list, adding, deleting, updating, and toggling. This hook took a single `task` object as a parameter, which created a conflict: you need the list before any single task exists.

### The Decision

Split into two hooks with clear, separate responsibilities:

**`useTaskList(category?)`** — owns the list

- Fetches all tasks for the current day from DB
- Holds `allTasks` state
- Exposes `filteredTasks` filtered by category for display on category pages
- Exposes `allTasks` for rank calculation on the dashboard
- Runs `fetchTasks` automatically on mount via `useEffect`
- `fetchTasks` is exposed so other hooks can call it after mutations

```typescript
const { allTasks, filteredTasks, fetchTasks } = useTaskList(category);
```

**`useTask(task)`** — owns single task operations

- Add, delete, update, toggle complete
- Calls `fetchTasks` from `useTaskList` after each operation to refresh the list
- No list state of its own

```typescript
const { addTask, deleteTask, updateTask, taskComplete } = useTask(task);
```

### Why This Separation

- `useTaskList` is about the collection — fetching and displaying
- `useTask` is about a single item — mutating
- Cleaner, easier to reason about, easier to debug

### One Fetch, Two Views

`useTaskList` fetches all tasks for the day in one API call, then filters in memory:

```typescript
const filteredTasks = category
  ? allTasks.filter((task) => task.category === category)
  : allTasks;
```

- Category page uses `filteredTasks` to display relevant tasks
- Dashboard uses `allTasks` for rank calculation

No need for separate API calls per category.

### Rule: A hook called in multiple places creates multiple isolated instances. If state needs to be shared, it must live in Context. Every consumer reads from Context — never calls the hook directly.

**createDay should only create a day document.
Streak logic should be in a separate route: POST /api/dashboard/streak
Called separately on login after createDay completes.**
