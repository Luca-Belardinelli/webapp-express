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

            //AGGIUNGO PROPRIETà img AL SINGOLO MOVIE
            movie.image = req.imagePath + movie.image;

            // TORNO OGGETTO AGGIORNATO
            res.json(movie);

        });
    });
}

//INSERIMENTO NUOVO movies
function store(req, res, next) {

    // DESTRUTTURO
    const { title, director, abstract } = req.body;

    //GESTIAMO IL VALORE DEL NOME FILE CREATO DAL MIDDLEWARE
    const imageName = `${req.file.filename}`;

    // QUERY INSERT
    const query = 'INSERT INTO movies (title, director, abstract , image) VALUES (?, ?, ?, ?)'

    // QUERY
    connection.query(query,
        [title, director, abstract, imageName],
        (err, result) => {
            if (err) {
                console.log(err)
                return next(new Error("Errore interno del server"))
            }

            res.status(201).json({
                status: "succes",
                message: "Movie creato con successo",
            });
        }
    )
}

// STORE INSERIMENTO NUOVA REVIEW

function storeReview(req, res) {

    //ID PRESO DAI PARAMETRI PRESI DALLA ROTTA
    const { id } = req.params;

    // INFO PRESE DAL BODY DAL FRONTEND
    const { text, name, vote } = req.body;

    //QUERY
    const insertReviesSql = 'INSERT INTO reviews (text, name, vote , movie_id) VALUES (?, ?, ?, ?)'

    //ESEGUIAMO LA QUERY 
    connection.query(insertReviesSql, [text, name, vote, id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.status(201);
        res.json({ message: 'Review added', id: results.insertId });
    });
}



// esportiamo tutto
module.exports = { index, show, store, storeReview };