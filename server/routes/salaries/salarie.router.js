const express = require('express');
const routeSalarie = express.Router();
const {createSalarie, listSalarie, oneSalarie, deleteSalarie, updateSalarie, loginSalarie, getProfil, putUpdateSalarie} = require('./salarie.controller')
const verifyToken = require ('../../middleware/auth_middleware')

routeSalarie
//create "un salarie"
.post('/',createSalarie)


//login salarie
.post('/login', loginSalarie )

.use(verifyToken)

//getProfil
.get('/profil', getProfil )

//read le profil salarie
.get('/:id', oneSalarie )

//read la liste de tous les salariés
.get('/',listSalarie)

//delete le profil salarié
.delete('/:id',deleteSalarie)

//update les informations salariés
.put('/update',putUpdateSalarie)

//update les informations salariés
.put('/:id',updateSalarie)

module.exports = routeSalarie;