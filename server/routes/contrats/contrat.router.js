const express = require('express');
const routeContrat = express.Router();
const {createContrat, listContrat, oneContrat, deleteContrat, updateContrat}=require('./contrat.controller')
const verifyToken = require ('../../middleware/auth_middleware')

routeContrat
.use(verifyToken)
//create "un contrat"
.post('/',createContrat)

//read la liste de toutes le contrats
.get(listContrat)

routeContrat.route('/:id')
//read le contrat
.get(oneContrat)

//delete le contrat
.delete(deleteContrat)

//update les informations contrat
.put(updateContrat)

module.exports = routeContrat;