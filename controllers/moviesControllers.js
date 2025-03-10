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

// esportiamo tutto
module.exports = { index };