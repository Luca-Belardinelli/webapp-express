// RICHIAMIAMO EXPRESS
const express = require('express')
// INALIZZAZIONE EXPRESS
const app = express()
// DEFINIAMO LA PORTA
const port = 3000
// IMPORTIAMO IL ROUTER
const moviesRouter = require('./routers/movies')
// IMPORTIAMO IL MIDDLEWARE NOTFOUND
const notFound = require('./middlewares/notFound');
// IMPORTIAMO IL MIDDLEWARE ERRORE SERVER
const errorsHandler = require('./middlewares/errorsHandler');
// IMPORTIAMO IL MIDDLEWARE PER LA GESTIONE PATH IMG
const imagePath = require('./middlewares/imagePath');


// importiamo il middleware di CORS
var cors = require('cors')


// DEFINIAMO USA DI UNA CARTELLA PER I FILE STATICI
app.use(express.static('public'));

// REGISTRO IL BODY-PARSER PER JSON
app.use(express.json());

// REGISTRO MIDDLEWARE IMG
app.use(imagePath);

// registro il middleware di CORS
app.use(cors())

// DEFINIAMO LA PRIMA ROTTA
app.get('/api', (req, res) => {
    res.send('Server del mio blog')
})

// ROUTER
app.use("/api/movies", moviesRouter)


// UTILIZZIAMO NOTFOUND
app.use(notFound);

// UTILIZZIAMO ERROR SERVER
app.use(errorsHandler);

// AVVIAMO IL SERVER METTENDELO IN ASCOLTO SULLA PORTA INDICATA
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})