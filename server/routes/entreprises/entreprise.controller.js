const pool = require("../../db.js"); // Exécuter le code et renvoi l’objet

exports.createEntreprise = async (req, res) => {
    try {
        ;
        const {
            nom_entreprise,
            prenom_entreprise,
            telephone_entreprise,
            rue_entreprise,
            cp_entreprise,
            ville_entreprise,
            siret,
            raison_sociale,
            code_ape,
            email_entreprise,
            mdp_entreprise
        } = req.body; // = const description = req.body.description
        const entreprise = await pool.query(
            "INSERT INTO entreprise (nom_entreprise,prenom_entreprise,telephone_entreprise,rue_entreprise,cp_entreprise,ville_entreprise,siret, raison_sociale,code_ape, email_entreprise, mdp_entreprise) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
            [
                nom_entreprise,
                prenom_entreprise,
                telephone_entreprise,
                rue_entreprise,
                cp_entreprise,
                ville_entreprise,
                siret,
                raison_sociale,
                code_ape,
                email_entreprise,
                mdp_entreprise
            ]
        );

        res.json(entreprise); //renvoie la réponse en string
    } catch (err) {
        console.log(err.message);
    }
}

exports.listEntreprise = async (req, res) => {
    try {
        const allEntreprise = await pool.query("SELECT * FROM entreprise");
        res.json(allEntreprise.rows);
    } catch (error) {
        console.log(error.message);
    }
}

exports.oneEntreprise = async (req, res) => {
    try {
        const { id } = req.params; //récupère :id
        const oneEntreprise = await pool.query("SELECT * FROM entreprise WHERE id_entreprise = $1", [id]);
        res.json(oneEntreprise.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteEntreprise = async (req, res) => {
    try {
        const { id } = req.params; //récupère :id
        const deleteEntreprise = await pool.query("DELETE FROM entreprise WHERE id_entreprise = $1", [id]);
        res.json("Entreprise was deleted !")
    } catch (error) {
        console.log(error.message);
    }
}

exports.updateEntreprise = async (req, res) => {
    try {
        const { id } = req.params; //récupère :id
        const { nom_entreprise,
            prenom_entreprise,
            telephone_entreprise,
            rue_entreprise,
            cp_entreprise,
            ville_entreprise,
            siret,
            raison_sociale,
            code_ape,
            email_entreprise,
            mdp_entreprise } = req.body;

        const updateEntreprise = await pool.query("UPDATE entreprise SET nom_entreprise=$1, prenom_entreprise=$2, telephone_entreprise=$3, rue_entreprise=$4, cp_entreprise=$5, ville_entreprise=$6, siret=$7, raison_sociale=$8, code_ape=$9, email_entreprise=$10, mdp_entreprise=$1 WHERE, id_entreprise=$12",

            [nom_entreprise,
                prenom_entreprise,
                telephone_entreprise,
                rue_entreprise,
                cp_entreprise,
                ville_entreprise,
                siret,
                raison_sociale,
                code_ape,
                email_entreprise,
                mdp_entreprise, id]
        );
        res.json("Entreprise was updated!")
    } catch (error) {
        console.log(error.message);
    }
}