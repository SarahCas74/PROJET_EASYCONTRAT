const Pool = require ("pg").Pool; //créer l’objet qui correspond à la connexion à la BDD
const pool = new Pool ({
    user: "postgres",
    password : "digifab74",
    host : "localhost",
    port : 5432,
    database : "projetcontrat"
});
module.exports = pool; //exporter pool
