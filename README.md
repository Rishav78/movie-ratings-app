# movie-ratings-app


A NodeJS application where you can add and give review to movies.

For env configuration please check the .env.example file.

## Seeds or dummy data

Run `npm run seeds`. It'll add some dummy data to database.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the dev mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm start`

Runs the app in the prod mode.<br />

### `npm run build`
 
To compile the Typescript into JavaScript.

# API

### `http://localhost:3000/api/rating` PUT

Add a new review 

### Body Schema
```
{
    "user": string,
    "movie": string,
    "stars": number
}
```

### `http://localhost:3000/api/rating/:movie` GET

Get rating for a specific movie. Here :movie is the movie id.

### `http://localhost:3000/api/rating?order=1&&pgNo=0&&pgSize=10` GET

Get rating for all the movies
