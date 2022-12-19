const express = require("express"); // importer la librairie express (elle permet de gérer des routes et de créer un serveur)
const app = express(); //créer l’application express
const cors = require("cors"); //cross origin ressource sharing, permet de recevoir des requêtes d’un domaine différent de celui du serveur, autoriser tout le mode à accéder au serveur
const myRouterSalarie = require ("./routes/salaries/salarie.router")
const myRouterEntreprise = require ("./routes/entreprises/entreprise.router")
const myRouterContrat = require ("./routes/contrats/contrat.router")

//middleware = intermédiaire
app.use(cors()); //autoriser les requêtes
app.use(express.json()); //req.body //mettre un objet à la place du texte, et passe la requête à la suivante
app.use("/salarie",myRouterSalarie)
app.use("/entreprise", myRouterEntreprise)
app.use("/contrat",myRouterContrat)

//écouter sur le serveur
app.listen(5000, () => {
    console.log("server has started on port 5000");
});
