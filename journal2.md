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

# working with UI

# UI Rules & Responsive Design

## The Approach — Order of Work

Always work top-down. Get each level right before touching components inside it.

1. **`globals.css` first** — set body background, fonts, margin/padding reset, min-height. This is the foundation everything else builds on. If the body isn't right, nothing else will be.

2. **Root layout (`app/layout.tsx`)** — set `min-h-screen`, `flex flex-col` on body or root div. This defines the full height boundary for the entire app. Only one `min-h-screen` here — never repeat it in children.

3. **Dashboard layout** — add navbar, wrap children in `flex-1` so content fills remaining space after navbar. No centering here — layout is just structure.

4. **Each page** — page controls its own centering with `items-center justify-center`. Not every page needs to be centered the same way — a task list page might want top-aligned content, a dashboard might want vertically centered. Let each page decide.

5. **Content container** — `w-full max-w-2xl mx-auto px-4` to cap width and add breathing room on edges.

6. **Components** — always `w-full` so they fill their parent. Control size from the parent, not the component itself.

---

## Layout Hierarchy

Work top-down — get each level right before styling components inside it.

```
body (full width, full height) — set in globals.css
  └── layout (w-full, min-h-screen, flex flex-col)
       └── navbar (fixed height)
            └── content area (flex-1) — fills remaining space
                 └── page (h-full) — fills parent, no new height boundaries
                      └── content container (w-full, max-w-2xl, mx-auto, px-4)
                           └── components (w-full)
```

## Key Rules

### Height

- `min-h-screen` goes on the **layout only** — defines the full height boundary
- **Pages and children** use `h-full` — fill the parent, don't create new height boundaries
- Never use `min-h-screen` on children — it adds 100vh on top of each other causing overflow

### Width

- Never put fixed widths like `w-48` or `w-3xs` on containers
- Use `w-full` on components so they fill their parent
- Control max width from the **content container**: `max-w-2xl mx-auto`
- Use `px-4` on content container so content doesn't touch screen edges on mobile

### Flexbox

- Layout is `flex flex-col` — children stack vertically
- Navbar takes its natural height
- `flex-1` on content area fills remaining space after navbar
- Don't repeat `flex flex-col` in children if parent already has it

### Centering

- Control centering at the **page level**, not the layout
- Layout just provides the container — each page decides its own alignment
- `items-center justify-center` on the page div for centered content

### Overflow

- One `min-h-screen` at the top prevents overflow cascading
- `overflow-x: hidden` on body prevents horizontal overflow
- If something is scrolling unexpectedly, check for `min-h-screen` on a child component

---

## Responsive Breakpoints (Tailwind)

Tailwind is **mobile first** — write base styles for mobile, override for larger screens.

- `sm` — 640px and above
- `md` — 768px and above (tablet)
- `lg` — 1024px and above (desktop)
- `xl` — 1280px and above

```tsx
// Text scaling
<p className="text-sm md:text-lg lg:text-2xl">

// Width control
<div className="w-full md:w-3/4 lg:w-1/2">

// Layout direction
<div className="flex flex-col md:flex-row">

// Padding
<div className="p-2 md:p-4 lg:p-6">
```

Use breakpoints on components where size or layout should change:

- Text — smaller on mobile, bigger on desktop
- Padding/margins — tighter on mobile, more spacious on desktop
- Width — full width on mobile, capped on desktop
- Flex direction — column on mobile, row on desktop

---

## Background Image (globals.css)

```css
body {
  background-color: #0a0a0a; /* fallback */
  background-image: url("/bg-mobile.jpg");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  min-height: 100vh;
  width: 100%;
  margin: 0;
  padding: 0;
}

@media (min-width: 768px) {
  body {
    background-image: url("/bg-tablet.jpg");
  }
}

@media (min-width: 1024px) {
  body {
    background-image: url("/bg-desktop.jpg");
  }
}
```

- `background-size: cover` — stretches image to fill screen, crops if needed
- `background-position: center` — keeps center in view when cropped
- `background-attachment: fixed` — parallax effect, image stays fixed while content scrolls
- Never use `background` shorthand — it overrides `background-image`

---

## Typography

- Use `variable` fonts in Next.js to apply two fonts
- Headings → Cinzel (all caps, medieval feel)
- Body text → IM Fell English (normal casing, aged manuscript feel)

```tsx
// layout.tsx
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const imFell = IM_Fell_English({ subsets: ["latin"], variable: "--font-im-fell" });

<html className={`${cinzel.variable} ${imFell.variable}`}>
```

```css
/* globals.css */
body {
  font-family: var(--font-im-fell);
}
h1,
h2,
h3 {
  font-family: var(--font-cinzel);
}
```
