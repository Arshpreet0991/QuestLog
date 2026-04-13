## create models

- we need 3 models
  - User
  - Day
  - Tasks
- Since, Tasks are always dependent on the day, we are not fetching tasks independently, therefore task is stored as an array inside Day document. This approach is called embedded approach.

- Tasks are embedded because:
  - all reads are per-day (always have dayId first)
  - tasks are bounded and owned exclusively by the day
  - no cross-day task queries needed
  - cross-day aggregation only needs Day documents (dailyGrade)

`**steps**`

#### create types (`src/types/...`)

- Daily Rank is NOT stored — derived from score via utility function

- task counts are NOT stored — computed from taskList array

#### create models (`src/models/...`)

- Mongoose model shapes use `interface` (not `type`) because
  Mongoose needs declaration merging
- Embedded subdocuments (ITask, IReflection) use plain `interface`
  without extending mongoose.Document

## Standardize api response

- create the response `type` in `src/types`
- create a standard success and error response in `src/lib/response.ts`

## Create Auth System

### Zod

- zod validations in folder called `src/schemas`
- **Flow**
  → Client sends request
  → API route receives the body
  → Zod validates the shape and values ← this is where Zod runs
  → if invalid, return 400 error
  → if valid, write to database

- Server validation is mandatory
- Client validation is optional (UX convenience only)
- Zod validates shape, DB validates business logic (wrong password etc.)

### Database connections

- Nextjs runs on edge, so we need to check if the db is already connected or not.
- we only create the conenction if db is already not connected.

### Set up resend email

- Create an email template in `src/email`
  - boilerplate code from resend docs.
- create a file in `src/lib`
  - this file will containt the function to send email
  - this function returns a promise of type api response.
  - have to get a domain, to send it to other users

### write the auth api - sign up, sign-in, verify-code

#### setup `sign-up` api

- create a folder `api/(auth)/sign-up`
- verify the user input (username, email, password) using zod
- create a 6 digit verification code

we follow this algorithm:

- if a user exists
  - check if user is verified
    - if verified, then send error - user already exists
    - if user exists but is not verified, store the password entered by the user, hash it and update the password field. Send a new verification code to user.
- if user doesn't exists
  - create a hashed password
  - create a new user object
  - save to Db.
  - send verification email

#### setup `sign-in` using next auth

- we have to create a folder `app/api/auth/[...nextauth]`
- we create a file called `options.ts`
- next auth will handle all the token and cookie process for us. It will also create login session for us. We can grab the user id from the session.
- for next auth we require to set up a few things
  - `Credentials Provider` - I want to authenticate users with email and password"
  - `authorize function` - Lives inside the Credentials Provider. This is where my login logic runs
  - `callbacks` this function runs at specific points in the auth lifecycle.
    - the two callback i am using is `jwt` and `session`
    - we can add our custom fields to token and session here.
    - we get only user id in basic authJS. To add more data to our token and session, we have to create Interface for our token and session.
    - to do that, we create a file in `src/types/ mext-auth.d.ts`
  - `pages` - tells NextAuth to use your custom pages instead of its defaults.
  - `session` - Configures how sessions work: `strategy: "jwt"`

## Verify code

- Create sign up page
- redirect to verify code after sign up
- send the email of the user over url using searchParams
- on verify code- hit the verify code api and then redirect to dashboard.

## set up proxy

- set up proxy and set the redirects
- if a user has a token, then user is considered logged in.
