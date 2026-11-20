# Family Movie Watchlist API

A JWT-protected Express API for family movie watchlists.

## Run locally

1. Install Node.js.
2. Copy `.env.example` to `.env` and set a private `JWT_SECRET`.
3. Install dependencies and start the server:

```sh
npm install
npm start
```

The API listens on the port configured by `PORT` (3000 by default).

## Routes

- `POST /api/auth/login` — authenticate a user and receive a one-hour JWT.
- `GET /api/watchlist/:userId` — retrieve a user's watchlist.
- `POST /api/watchlist/:userId/movies` — add a movie.
- `PUT /api/watchlist/:userId/movies/:movieId` — update a movie.
- `DELETE /api/watchlist/:userId/movies/:movieId` — remove a movie.

Send the token as `Authorization: Bearer <token>` to access watchlist routes. Parent accounts can modify any family list; child accounts can modify only their own.

Never commit the private `.env` file or a real JWT secret.
