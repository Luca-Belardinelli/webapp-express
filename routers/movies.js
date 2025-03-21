// IMPORTIAMO EXPRESS E UTILIZZIAMO LA PARTE DI ROUTING
const express = require('express');
const router = express.Router();

// IMPORTIAMO LE FUNZIONI DEL CONTROLLER
const movieControllers = require('../controllers/moviesControllers');

// importiamo il middelware della gestione file
const upload = require('../middlewares/multer');



// ROTTE  CRUD
// INDEX
router.get('/', movieControllers.index);

// SHOW
router.get('/:id', movieControllers.show);

// STORE REWIES
router.post('/:id/reviews', movieControllers.storeReview);

// STORE MOVIE
router.post('/', upload.single('image'), movieControllers.store);


// ESPORTIAMO IL MODULO ROUTER
module.exports = router;