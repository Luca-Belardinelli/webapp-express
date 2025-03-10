
// FUNZIONE MIDDLEWARE SERVER 

function errorsHandler(err, req, res, next) {
    res.status(500)
    res.json({
        message: "err.message",
    });
};

// ESPORTIAMO LA FUNZIONE
module.exports = errorsHandler;