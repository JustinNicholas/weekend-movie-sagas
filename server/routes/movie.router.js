const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// We get all of the movie info from the movie table in the DB and send back the info to the store
router.get('/', (req, res) => {

  const query = `SELECT * FROM movies ORDER BY "title" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});

router.post('/', (req, res) => {
  console.log(req.body);
  // RETURNING "id" will give us back the id of the created movie
  const insertMovieQuery = `
  INSERT INTO "movies" ("title", "poster", "description")
  VALUES ($1, $2, $3)
  RETURNING "id";`

  // FIRST QUERY MAKES MOVIE
  pool.query(insertMovieQuery, [req.body.title, req.body.poster, req.body.description])
  .then(result => {
    // console.log('New Movie Id:', result.rows[0].id); //ID IS HERE!
    // this is the id of the movie we added and we need this to add multiple genres
    const createdMovieId = result.rows[0].id

    // Now handle the genre reference
    const insertMovieGenreQuery = `
      INSERT INTO "movies_genres" ("movie_id", "genre_id")
      VALUES  ($1, $2);
      `
      // we loop through the array of genres and add each genrea to the DB with the movie id from the movie we submitted.
      for( let i=0; i<req.body.genre_id.length;i++){
        console.log(req.body.genre_id[i]);
      

      // SECOND QUERY ADDS GENRE FOR THAT NEW MOVIE
      pool.query(insertMovieGenreQuery, [createdMovieId, req.body.genre_id[i]]).then(result => {

      }).catch(err => {
        // catch for second query
        console.log(err);
        res.sendStatus(500)
      })
      }
      //moved this here because we cannot send multiple res.status in the same query.
      res.sendStatus(201);
// Catch for first query
  }).catch(err => {
    console.log(err);
    res.sendStatus(500)
  })
})

module.exports = router;