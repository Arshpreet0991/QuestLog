# Work-FLow

## Modelling

#### Key questions to ask

- **Directory** `src/models`
- What data do I need to store?
- How can I group this data (what belongs together)?
- What type of data is each field (text, number, date, etc.)?
- What should I not store because it can be calculated later?
- What rules must always be true? (limits, uniqueness, relationships)
- Which fields should come from the user, and which should only be set by the server?

#### Interfaces

- **Directory** `src/types`
- Each model will have a `.type.ts` file.
- It’s just a description of what an object should look like in your code.
- It gives us type safety and suggestions. I

## zod validations

- **Directory** `src/schemas`
- install zod package
- add validations like `z.string(),z.email()`

## DB Connection

- **Directory** `src/lib/dbConnect.ts`
- we want to check before if the db is already connected or not, because we dont want to choke the DB with repeated `connectDB` calls.
- `mongoose.connect.connections[0].readyState` gives us the status of the connection:
  - 0 : disconnected
  - 1 : connected
  - 2 : connecting
  - 3 : disconnecting
  - based on this, we decide if we want to connect to DB with a new DB call or DB is already connected.

## Set up resend email

- create an api key by logging in resend account.
- install resend package
- **Directory** `src/lib/resend.ts`
- follow the docs and go from there

## Standardize Api Response / Error Response

- first set the interface of the response
- `src/types/ApiResponse.ts`

  ```ts
  export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
  }

  // data is optional, therefore the "?"
  // T is the just a placeholder, widely expected by community
  ```

- Now, create a file called response.ts in `src/helpers`
- This is where we make it a standardize response

  ```ts
  import { ApiResponse } from "@/types/ApiResponse";
  import { NextResponse } from "next/server";

  export function successResponse<T>(
    status: number,
    message: string,
    data?: T,
  ) {
    return NextResponse.json<ApiResponse<T>>(
      {
        success: true,
        message,
        data,
      },
      { status },
    );
  }

  export function errorResponse<T>(message: string, status: number, data?: T) {
    return NextResponse.json<ApiResponse<T>>(
      {
        success: false,
        message,
        data,
      },
      { status },
    );
  }
  ```

## Next-Auth

# AuthJS Setup Flow

## 1. Create `src/auth.ts`

Your main AuthJS config file. This is where providers, callbacks, and pages go.

## 2. Create `src/app/api/auth/[...nextauth]/route.ts`

Just exports handlers from your auth config. Two lines of code.

## 3. Extend AuthJS types

Module augmentation to add `_id` and any custom fields to the session and token.

## 4. Configure Credentials provider in `auth.ts`

Add the `authorize` function that hits your DB and validates credentials.

## 5. Add callbacks in `auth.ts`

`jwt` and `session` callbacks to pass `_id` through to the session.

## 6. Add `pages` in `auth.ts`

Tell AuthJS to use your custom `/sign-in` page instead of its default one.

## 7. Wrap your app with `SessionProvider`

Add AuthJS `SessionProvider` in your root layout so the session is available client-side.

---

**Data flow to remember:**
`authorize → jwt callback → session callback → getServerSession()`
