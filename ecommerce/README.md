This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project Distribution
---------------------------------------------

This project `Project Distribution` is developed using ![NextJs](https://nextjs.org/).


### System Requirements

1. ![Node.js](https://nodejs.org/en/) 12.22.0 or later
2. ![NPM](https://www.npmjs.com/) or ![Yarn](https://yarnpkg.com/)
3. MacOS, Windows (including WSL), and Linux are supported

### Software Requirements
For authentication, we're going to use ![Next-Auth](https://next-auth.js.org/), which is a complete open-source authentication solution for Next.js applications,
And ![Supabase](https://supabase.com/) database to store our data, which is also an open-source firebase alternative.
To work with this project, one must have the following credentials.
1. ![Github oAuth](https://developer.github.com/apps/building-oauth-apps/authorizing-oauth-apps) credentials,(Github Id and Secret)
2. ![Google oAuth](https://developers.google.com/identity/protocols/oauth2) credentials, (Google Id and Secret)
3. ![Supabase](https://supabase.com/) credentials, (Supabase URL and ANON key)


### Setup

First, install the dependencies for this project:
```bash
yarn
# or
npm
```

Then, run the development server:

```bash
yarn dev
# or
npm run dev
```
Using `yarn` for both cases is recommended

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### FAQ
To work with this project one must have prepare a environment file with following properties. 
The file name should be `.env.local` and must contain in the project directory.
```
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL= SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY= SUPABASE_ANON_KEY
GOOGLE_ID= GOOGLE_OAuth_ID
GOOGLE_SECRET= GOOGLE_OAuth_SECRET
GITHUB_ID= GITHUB_OAuth_ID
GITHUB_SECRET= GITHUB_OAuth_SECRET
```

To get more info:

1. ![NextJs Quick Start](https://nextjs.org/docs/getting-started)
2. ![Supabase Quick Start](https://supabase.com/docs/guides/with-nextjs)
4. ![Next-Auth Google oAuth](https://next-auth.js.org/providers/google)
5. ![Next-Auth Github oAuth](https://next-auth.js.org/providers/github)



[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
