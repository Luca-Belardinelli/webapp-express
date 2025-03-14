// per la gestione dell'upload di file
const multer = require("multer");

// File upload middleware
const storage = multer.diskStorage({
    //cartella in cui verranno salvati i file
    destination: "./public/img/movies/",
    filename: (req, file, cb) => {
        // Crea un nome univoco usando il timestamp
        const uniqueName = `${Date.now()}-${file.originalname}`;
        // Salva il file con il nuovo nome
        cb(null, uniqueName);
    },
});
// Crea l'istanza di Multer con lo storage configurato
const upload = multer({ storage });

module.exports = upload;