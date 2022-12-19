const express = require('express');
const routeEntreprise = express.Router();
const {createEntreprise, listEntreprise, oneEntreprise, deleteEntreprise, updateEntreprise, loginEntreprise, getProfil, putUpdateEntreprise, listSalaries} = require ('./entreprise.controller')
const verifyToken = require ('../../middleware/auth_middleware')

routeEntreprise
//create "une entreprise"
.post('/',createEntreprise)

//login entreprise
.post('/login', loginEntreprise)

.use(verifyToken)

//read la liste de tous les salariés
.get('/listesalaries',listSalaries)

//getProfil
.get('/profil', getProfil )

//read la liste de toutes les entreprises
.get('/',listEntreprise)

//update les informations salariés
.put('/update',putUpdateEntreprise)

//delete le profil entreprise
.delete('/:id', deleteEntreprise)

//read le profil entreprise
.get('/:id', oneEntreprise)

//update les informations entreprise
.put('/:id',updateEntreprise)

module.exports = routeEntreprise;



