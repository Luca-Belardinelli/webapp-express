// IMPORTIAMO EXPRESS E UTILIZZIAMO LA PARTE DI ROUTING
const express = require('express');
const router = express.Router();

// IMPORTIAMO LE FUNZIONI DEL CONTROLLER
const movieControllers = require('../controllers/moviesControllers');



// ROTTE  CRUD
// INDEX
router.get('/', movieControllers.index);

// SHOW
router.get('/:id', movieControllers.show);



// ESPORTIAMO IL MODULO ROUTER
module.exports = router;