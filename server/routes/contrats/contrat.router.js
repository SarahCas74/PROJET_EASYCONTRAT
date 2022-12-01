const express = require('express');
const routeContrat = express.Router();
const {createContrat, listContrat, oneContrat, deleteContrat, updateContrat}=require('./contrat.controller')

routeContrat.route('/contrat')
//create "un contrat"
.post(createContrat)

//read la liste de toutes le contrats
.get(listContrat)

routeContrat.route('/contrat/:id')
//read le contrat
.get(oneContrat)

//delete le contrat
.delete(deleteContrat)

//update les informations contrat
.put(updateContrat)

module.exports = routeContrat;