
// FUNZIONE MIDDLEWARE ROTTA INESISTENTE 

function notFound(req, res, next) {
    res.status(404)
    res.json({
        error: "Not Found",
        message: "Pagina non trovata"
    });
};

// ESPORTIAMO LA FUNZIONE
module.exports = notFound;