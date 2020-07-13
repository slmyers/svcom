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

