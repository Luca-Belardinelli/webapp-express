// IMPORTIAMO FILE CONNESSIONE AL DB
const connection = require('../data/db');

// FUNZIONE PER LE ROTTE

// INDEX
function index(req, res) {

    // preparo la query
    const sql = 'SELECT * FROM movies';

    // eseguo la query
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        res.json(results);
    });
}

// SHOW
function show(req, res) {
    // RECUPERIAMO L'ID E TRASFORMIAMOLO IN UN NUMERO
    const { id } = req.params;
    // RICHIAMO SINGOLO movies TRAMITE ID
    const detailmovie = 'SELECT * FROM movies WHERE id = ?';
    // CHIAMATA TRAMITE MYSQL2 A DB 
    connection.query(detailmovie, [id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: 'movies not found' });
        res.json(results[0]);
    });
}

// esportiamo tutto
module.exports = { index, show };