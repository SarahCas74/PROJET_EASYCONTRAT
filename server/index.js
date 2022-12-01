const express = require("express"); // importer la librairie express (elle permet de gérer des routes et de créer un serveur)
const app = express(); //créer l’application express
const cors = require("cors"); //cross origin ressource sharing, permet de recevoir des requêtes d’un domaine différent de celui du serveur, autoriser tout le mode à accéder au serveur
const myRouterSalarie = require ("./routes/salaries/salarie.router")
const myRouterEntreprise = require ("./routes/entreprises/entreprise.router")
const myRouterContrat = require ("./routes/contrats/contrat.router")

//middleware = intermédiaire
app.use(cors()); //autoriser les requêtes
app.use(express.json()); //req.body //mettre un objet à la place du texte, et passe la requête à la suivante
app.use (myRouterSalarie, myRouterEntreprise, myRouterContrat)

//ROUTES//
//----------------------------SALARIE-------------------------------------
// //create "un salarie"
// app.post("/salarie", async (req, res) => {
//     try {
//         ;
//         const {
//             nom_salarie,
//             prenom_salarie,
//             telephone_salarie,
//             rue_salarie,
//             cp_salarie,
//             ville_salarie,
//             num_ss,
//             date_naissance,
//             lieu_naissance,
//             nom_jeune_fille,
//             email_salarie,
//             mdp_salarie
//         } = req.body; // = const description = req.body.description
//         const salarie = await pool.query(
//             "INSERT INTO salarie (nom_salarie,prenom_salarie,telephone_salarie,rue_salarie,cp_salarie,ville_salarie,num_ss,date_naissance,lieu_naissance,nom_jeune_fille, email_salarie, mdp_salarie) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
//             [
//                 nom_salarie,
//                 prenom_salarie,
//                 telephone_salarie,
//                 rue_salarie,
//                 cp_salarie,
//                 ville_salarie,
//                 num_ss,
//                 date_naissance,
//                 lieu_naissance,
//                 nom_jeune_fille,
//                 email_salarie,
//                 mdp_salarie
//             ]
//         );

//         res.json(salarie); //renvoie la réponse en string
//     } catch (err) {
//         console.log(err.message);
//     }
// });

// //read la liste de tous les salariés
// app.get("/salarie", async (req, res) => {
//     try {
//         const allSalarie = await pool.query("SELECT * FROM salarie");
//         res.json(allSalarie.rows);
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //read le profil salarie
// app.get("/salarie/:id", async (req, res) => {
//     try {
//         const { id } = req.params; //récupère :id
//         const oneSalarie = await pool.query("SELECT * FROM salarie WHERE id_salarié = $1", [id]);
//         res.json(oneSalarie.rows[0]);
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //delete le profil salarié
// app.delete("/salarie/:id", async (req, res) => {
//     try {
//         const { id } = req.params; //récupère :id
//         const deleteSalarie = await pool.query("DELETE FROM salarie WHERE id_salarié = $1", [id]);
//         res.json("Salarie was deleted !")
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //update les informations salariés
// app.put("/salarie/:id", async (req, res) => {
//     try {
//         const { id } = req.params; //récupère :id
//         const { nom_salarie,
//             prenom_salarie,
//             telephone_salarie,
//             rue_salarie,
//             cp_salarie,
//             ville_salarie,
//             num_ss,
//             date_naissance,
//             lieu_naissance,
//             nom_jeune_fille,
//             email_salarie,
//             mdp_salarie } = req.body;

//         const updateSalarie = await pool.query("UPDATE salarie SET nom_salarie=$1, prenom_salarie=$2, telephone_salarie=$3, rue_salarie=$4, cp_salarie=$5, ville_salarie=$6, num_ss=$7, date_naissance=$8, lieu_naissance=$9, nom_jeune_fille=$10, email_salarie=$11, mdp_salarie=$12 WHERE id_salarié=$13",

//             [nom_salarie,
//                 prenom_salarie,
//                 telephone_salarie,
//                 rue_salarie,
//                 cp_salarie,
//                 ville_salarie,
//                 num_ss,
//                 date_naissance,
//                 lieu_naissance,
//                 nom_jeune_fille,
//                 email_salarie,
//                 mdp_salarie, id]
//         );
//         res.json("Salarie was updated!")
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //----------------------------ENTREPRISE-------------------------------------
// //create "une entreprise"
// app.post("/entreprise", async (req, res) => {
//     try {
//         ;
//         const {
//             nom_entreprise,
//             prenom_entreprise,
//             telephone_entreprise,
//             rue_entreprise,
//             cp_entreprise,
//             ville_entreprise,
//             siret,
//             raison_sociale,
//             code_ape,
//             email_entreprise,
//             mdp_entreprise
//         } = req.body; // = const description = req.body.description
//         const entreprise = await pool.query(
//             "INSERT INTO entreprise (nom_entreprise,prenom_entreprise,telephone_entreprise,rue_entreprise,cp_entreprise,ville_entreprise,siret, raison_sociale,code_ape, email_entreprise, mdp_entreprise) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
//             [
//                 nom_entreprise,
//                 prenom_entreprise,
//                 telephone_entreprise,
//                 rue_entreprise,
//                 cp_entreprise,
//                 ville_entreprise,
//                 siret,
//                 raison_sociale,
//                 code_ape,
//                 email_entreprise,
//                 mdp_entreprise
//             ]
//         );

//         res.json(entreprise); //renvoie la réponse en string
//     } catch (err) {
//         console.log(err.message);
//     }
// });

// //read la liste de toutes le entreprises
// app.get("/entreprise", async (req, res) => {
//     try {
//         const allEntreprise = await pool.query("SELECT * FROM entreprise");
//         res.json(allEntreprise.rows);
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //read le profil entreprise
// app.get("/entreprise/:id", async (req, res) => {
//     try {
//         const { id } = req.params; //récupère :id
//         const oneEntreprise = await pool.query("SELECT * FROM entreprise WHERE id_entreprise = $1", [id]);
//         res.json(oneEntreprise.rows[0]);
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //delete le profil entreprise
// app.delete("/entreprise/:id", async (req, res) => {
//     try {
//         const { id } = req.params; //récupère :id
//         const deleteEntreprise = await pool.query("DELETE FROM entreprise WHERE id_entreprise = $1", [id]);
//         res.json("Entreprise was deleted !")
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //update les informations entreprise
// app.put("/entreprise/:id", async (req, res) => {
//     try {
//         const { id } = req.params; //récupère :id
//         const { nom_entreprise,
//             prenom_entreprise,
//             telephone_entreprise,
//             rue_entreprise,
//             cp_entreprise,
//             ville_entreprise,
//             siret,
//             raison_sociale,
//             code_ape,
//             email_entreprise,
//             mdp_entreprise } = req.body;

//         const updateEntreprise = await pool.query("UPDATE entreprise SET nom_entreprise=$1, prenom_entreprise=$2, telephone_entreprise=$3, rue_entreprise=$4, cp_entreprise=$5, ville_entreprise=$6, siret=$7, raison_sociale=$8, code_ape=$9, email_entreprise=$10, mdp_entreprise=$1 WHERE, id_entreprise=$12",

//             [nom_entreprise,
//                 prenom_entreprise,
//                 telephone_entreprise,
//                 rue_entreprise,
//                 cp_entreprise,
//                 ville_entreprise,
//                 siret,
//                 raison_sociale,
//                 code_ape,
//                 email_entreprise,
//                 mdp_entreprise, id]
//         );
//         res.json("Entreprise was updated!")
//     } catch (error) {
//         console.log(error.message);
//     }
// })


// //----------------------------CONTRAT-------------------------------------
// //create "un contrat"
// app.post("/contrat", async (req, res) => {
//     try {
//         ;
//         const {
//             type_,
//             is_fullTime,
//             date_debut,
//             date_fin,
//             periode_fin_essai,
//             remuneration,
//             motif,
//             fonction,
//             statut,
//             fk_entreprise,
//             fk_salarie
//         } = req.body; // = const description = req.body.description
//         const contrat = await pool.query(
//             "INSERT INTO contrat (type_,\"is_fullTime\",date_debut,date_fin,periode_fin_essai,remuneration,motif, fonction,statut, fk_entreprise, fk_salarie) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
//             [
//                 type_,
//                 is_fullTime,
//                 date_debut,
//                 date_fin,
//                 periode_fin_essai,
//                 remuneration,
//                 motif,
//                 fonction,
//                 statut,
//                 fk_entreprise,
//                 fk_salarie
//             ]
//         );

//         res.json(contrat); //renvoie la réponse en string
//     } catch (err) {
//         console.log(err.message);
//     }
// });

// //read la liste de toutes le contrats
// app.get("/contrat", async (req, res) => {
//     try {
//         const allcontrat = await pool.query("SELECT * FROM contrat");
//         res.json(allcontrat.rows);
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //read le contrat
// app.get("/contrat/:id", async (req, res) => {
//     try {
//         const { id } = req.params; //récupère :id
//         const onecontrat = await pool.query("SELECT * FROM contrat WHERE id_contrat = $1", [id]);
//         res.json(onecontrat.rows[0]);
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //delete le contrat
// app.delete("/contrat/:id", async (req, res) => {
//     try {
//         const { id } = req.params; //récupère :id
//         const deletecontrat = await pool.query("DELETE FROM contrat WHERE id_contrat = $1", [id]);
//         res.json("contrat was deleted !")
//     } catch (error) {
//         console.log(error.message);
//     }
// })

// //update les informations contrat
// app.put("/contrat/:id", async (req, res) => {
//     try {
//         const { id } = req.params; //récupère :id
//         const { type,
//             is_fullTime,
//             date_debut,
//             date_fin,
//             periode_fin_essai,
//             remuneration,
//             motif,
//             fonction,
//             statut,
//             fk_entreprise,
//             fk_salarie } = req.body;

//         const updateContrat = await pool.query("UPDATE entreprise SET type=$1, is_fullTime=$2, date_debut=$3, date_fin=$4, periode_fin_essai=$5, remuneration=$6, motif=$7, fonction=$8, statut=$9, fk_entreprise=$10, fk_salarie=$11 WHERE id_contrat=$12",

//             [type,
//                 is_fullTime,
//                 date_debut,
//                 date_fin,
//                 periode_fin_essai,
//                 remuneration,
//                 motif,
//                 fonction,
//                 statut,
//                 fk_entreprise,
//                 fk_salarie, id]
//         );
//         res.json("Contrat was updated!")
//     } catch (error) {
//         console.log(error.message);
//     }
// })













//Lancer le server sur le port 5000

app.listen(5000, () => {
    console.log("server has started on port 5000");
});
