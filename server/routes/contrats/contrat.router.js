const express = require('express');
const routeContrat = express.Router();
const {createContrat, listContrat, oneContrat, deleteContrat, updateContrat}=require('./contrat.controller')
const verifyToken = require ('../../middleware/auth_middleware')

routeContrat
.use(verifyToken)
//create "un contrat"
.post('/',createContrat)

//read la liste de toutes le contrats
.get('/listecontrats',listContrat)

//read le contrat
.get('/onecontrat',oneContrat)

//delete le contrat
.delete('/deletecontrat/:id',deleteContrat)

//update les informations contrat
.put('/updatecontrat',updateContrat)

module.exports = routeContrat;