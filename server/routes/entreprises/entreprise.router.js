const express = require('express');
const routeEntreprise = express.Router();
const {createEntreprise, listEntreprise, oneEntreprise, deleteEntreprise, updateEntreprise} = require ('./entreprise.controller')

routeEntreprise.route('/entreprise')
//create "une entreprise"
.post(createEntreprise)

//read la liste de toutes le entreprises
.get(listEntreprise)

routeEntreprise.route('/entreprise/:id')
//read le profil entreprise
.get(oneEntreprise)

//delete le profil entreprise
.delete(deleteEntreprise)

//update les informations entreprise
.put(updateEntreprise)

module.exports = routeEntreprise;




