const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:id', (req, res) => {
  const queryText = `SELECT "genres".name, "genres".id FROM "movies"
  JOIN "movies_genres"
  ON "movies_genres".movie_id = "movies".id
  JOIN "genres"
  ON "genres".id = "movies_genres".genre_id
  WHERE "movies".id = $1;`

  const queryValues = [req.params.id]

  pool.query(queryText, queryValues)
    .then( result => {
      res.send(result.rows)
    }).catch( err => {
      console.log(err);
    })

  // Add query to get all genres
  // res.sendStatus(500)
});

module.exports = router;