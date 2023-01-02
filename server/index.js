const express = require("express"); // importer la librairie express (elle permet de gérer des routes et de créer un serveur)
const app = express(); //créer l’application express
const cors = require("cors"); //cross origin ressource sharing, permet de recevoir des requêtes d’un domaine différent de celui du serveur, autoriser tout le mode à accéder au serveur
const myRouterSalarie = require("./routes/salaries/salarie.router")
const myRouterEntreprise = require("./routes/entreprises/entreprise.router")
const myRouterContrat = require("./routes/contrats/contrat.router")

//middleware = intermédiaire
app.use(cors({
    credentials: true, origin: 'http://localhost:4200'
})); //autoriser les requêtes
app.use(express.json()); //req.body //mettre un objet à la place du texte, et passe la requête à la suivante
app.use("/salarie", myRouterSalarie)
app.use("/entreprise", myRouterEntreprise)
app.use("/contrat", myRouterContrat)


const multer = require('multer')
const sharp = require('sharp'),
    bodyParser = require('body-parser');


const dossierUpload = './uploads',
    nomFichier = 'document_receptione';

app.use(express.urlencoded({
    extended: false
}))

app.use('/documents', express.static(__dirname + '/uploads'))


let storageAdmin = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, dossierUpload)
    },
    filename: (req, file, cb) => {
        cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'))
    },
})
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(file);
        cb(null, dossierUpload)
    },
    filename: (req, file, cb) => {
        cb(null, Buffer.from(file.originalname, 'latin1').toString('utf8'))
    },
})

let upload = multer({
    storage: storage
})

app.post('/upload', upload.single('document'), (req, res) => {

    if (!req.file) {
        console.log('erreur lors de l\'upload');
        return res.send({ success: false })
    } else {
        console.log('le fichier est uploadé');
        sharp(req.file.path).resize(200, 200).toFile('thumb-' + req.file.originalname, (err, resizeImage) => {
            if (err) {
                console.log(err);
            } else {
                console.log(resizeImage);
            }
        })
        return res.send({ success: true })
    }


})


//écouter sur le serveur
app.listen(5000, () => {
    console.log("server has started on port 5000");
});
