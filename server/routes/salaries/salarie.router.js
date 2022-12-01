const express = require('express');
const routeSalarie = express.Router();
const {createSalarie, listSalarie, oneSalarie, deleteSalarie, updateSalarie, login} = require('./salarie.controller')
const verifyToken = require ('../../middleware/auth_middleware')

routeSalarie.route('/salarie')
//create "un salarie"
.post(createSalarie)

//read la liste de tous les salariés
.get(listSalarie)

//login salarie
routeSalarie.route('/salarie/login')
.post( login )

routeSalarie.use(verifyToken)

routeSalarie.route('/salarie/:id')
//read le profil salarie
.get(oneSalarie)

//delete le profil salarié
.delete(deleteSalarie)

//update les informations salariés
.put(updateSalarie)

module.exports = routeSalarie;