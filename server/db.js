const Pool = require ("pg").Pool; //créer l’objet qui correspond à la connexion à la BDD
const pool = new Pool ({
    user: "sarah",
    password : "DbYrZOtTFXQMRKVZ77WrC62Y6N3d81AE",
    host : "dpg-ceraqs6n6mpr60c34kn0-a.frankfurt-postgres.render.com",
    port : 5432,
    database : "easycontrat",
    ssl:true
});
module.exports = pool; //exporter pool
