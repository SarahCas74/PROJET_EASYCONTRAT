const Pool = require ("pg").Pool; //créer l’objet qui correspond à la connexion à la BDD
const pool = new Pool ({
    user: "sarah",
    password : "dPSKl3zkJbVC3uhvdfiWlJfvf715nRJ1",

    host : "dpg-ceqoluqrrk0bsuj5tc2g-a.frankfurt-postgres.render.com",

    port : 5432,
    database : "easycontract"
});
module.exports = pool; //exporter pool
