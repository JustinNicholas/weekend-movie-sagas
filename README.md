## Project Name:
# Weekend Movie Sagas

## Description:
Duration: Weekend (Aug 26th - 28th)

For this project I created a gallery of movies that can be clicked on to be brought to the movies description and genres. Users can also add new movies to the gallery by adding a title, description, image url, and categories in the Add Movie page. The biggest challenge of this project was getting the dropdown with multiple genres to be added. I was able to get the multiple genres added correctly by storing them in an array and mapping through the array to add each one to the database. Each genre is associated with the movie in the junction table.

This project was a lot of fun and I was able to do some cool effects to make the text look like neon. I had to research some animations to make this happen and learned a lot. I was also able to utilize the useParams hook for this project in order to keep the description information on the page on refresh.

If I had more time on this project I would have loved to add a video preview on hover of the movie cards on the description page. I did some research and attempted this but ran into an issue with CORS. 

# Screen Shot: [GIF of completed site](public/images/movie-saga-gif.gif)

## Prerequisites and Installation:

Node.js

Fork and Clone this repo

"npm install" in the termianl of this project

"npm run server" to start the server.

"npm run client" to start the client.

npm run client will automatically open http://localhost:3000/ in your browser

Create a database named saga_movies_weekend, The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, Open up your editor of choice and run an npm install

## Usage of website:

- A user can fill out a form to add a new movie.
- Users can view all the movie info by clicking on a movie poster.

## Built With:

React.js
Redux
Redux Sagas
Node.js
JSX
Material UI
PostgreSQL
Express.js
Axios
HTML
CSS
PG

## Support:

If you have suggestions or issues, please email me at nicholasj964@yahoo.com