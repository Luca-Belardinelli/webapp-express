// IMPORTIAMO FILE CONNESSIONE AL DB

const connection = require('../data/db');

// FUNZIONE PER LE ROTTE

// INDEX
function index(req, res) {

    // preparo la query per la richiesta dei movie

    const sql = 'SELECT * FROM movies';

    // eseguo la query

    connection.query(sql, (err, results) => {

        // se la query non va a buon fine

        if (err) return res.status(500).json({ error: 'Database query failed' });

        // versione mappata del risultato
        const movies = results.map(movie => {
            return {
                ...movie,
                image: req.imagePath + movie.image
            }
        })

        // se tutto va bene
        res.json(movies);
    });
}

// SHOW
function show(req, res) {

    // RECUPERIAMO L'ID E TRASFORMIAMOLO IN UN NUMERO
    const { id } = req.params;

    // SALVO IN UNA CONSTANTE QUERY DEI DETTAGLI MOVIES
    const detailmovie = 'SELECT * FROM movies WHERE  movies.id = ?';

    // SALVO IN UNA CONSTANTE QUERY DELLE RECENSIONI  MOVIES 
    const review = 'SELECT * FROM reviews  WHERE  movie_id = ?';

    // CHIAMATA TRAMITE MYSQL2 A DB  per i movies
    connection.query(detailmovie, [id], (err, results) => {

        if (err) return res.status(500).json({ error: 'Database query failed' });

        if (results.length === 0) return res.status(404).json({ error: 'movies not found' });


        // res.json(results[0]);
        const movie = results[0];

        // SE LA PRIMA OK ESEGUE QUESTA PER LE RECENSIONI
        connection.query(review, [id], (err, reviewResult) => {

            if (err) return res.status(500).json({ error: 'Database query failed' });


            //AGGIUNGO PROPRIETà REVIEW AI MOVIES
            movie.reviews = reviewResult;

            // TORNO OGGETTO AGGIORNATO
            res.json(movie);

        });
    });
}

// esportiamo tutto
module.exports = { index, show };