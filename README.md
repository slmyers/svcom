### see it live

[link](https://silvacom-exercise.vercel.app/)

- tested on Windows Desktop Chrome and Andoid Mobile Chrome.

### youtube video
[link](https://youtu.be/nItZg5zAkfg)

### getting started

- get an api key from [weatherstack](https://weatherstack.com/)

- setup your `.env.development` file see the sample (`sample.development.env.txt`)

- `npm ci`

- `npm run dev`

### a word on weatherstack

Unfortunately, I didn't realize how limiting the `weatherstack` free tier was before I was knee-deep in this assignment.
They require the `Professional` tier (`$49.99/month`) for `Forecast Data`, so I was unable to complete that optional feature.
To make up for that shortcoming, I thought caching the requests would also be an interesting feature, so I implemented (and tested)
that instead. Another shortcoming was they only provided an `http` endpoint at the free tier, in production this gave a `Mixed-Content`
error, so I had to make the request from a serverless function (see `pages/api`).

### tests

I did write some tests, you can run them with `npm run test`. They are located in the `tests` folder.


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/zeit/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/zeit/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
