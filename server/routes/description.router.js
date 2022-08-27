const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/:id', (req, res) => {
    const queryText = `SELECT * FROM "movies"
    WHERE id = $1;`;
    const queryValues = [req.params.id];

    console.log('text', queryText);
    console.log('values', queryValues);

    pool.query(queryText, queryValues)
        .then( result => {
            console.log(result);
            res.send(result.rows)
        }).catch( err => {
            console.log(err);
        })
})


module.exports = router;