const SECRET = require("../../config")
const jwt = require("jsonwebtoken")
const { isEmail } = require("validator")
const pool = require("../../db.js"); // Exécuter le code et renvoi l’objet
const hashPassword = require('../../utils/hash_password')

exports.createEntreprise = async (req, res) => {
    try {
        let {
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

        //validate mail
        if (!isEmail(email_entreprise)) {
            return [false, "invalid email"];
        }

        //hash the password
        mdp_entreprise = hashPassword(mdp_entreprise)

        //vérifier si l'utilisateur existe

        let entreprise = await pool.query("SELECT * FROM entreprise WHERE email_entreprise=$1",
            [email_entreprise]);

        entreprise = entreprise.rows[0]


        if (entreprise) {
            res.status(400).send('cette adresse mail est déjà utilisée')
            return false;
        }

        entreprise = await pool.query(
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

        entreprise = entreprise.rows[0]
        let id = entreprise.id_entreprise
        //create the token
        const token = jwt.sign(
            {
               id, email_entreprise, mdp_entreprise
            },
            SECRET,
            {
                expiresIn: "720h",
            }
        )

        res.json({ ...entreprise, token }); //renvoie la réponse en string
    } catch (err) {
        console.log(err.message);
        res.json(err.message)
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
    const { id } = req.params; //récupère :id
    try {
        const oneEntreprise = await pool.query("SELECT * FROM entreprise WHERE id_entreprise = $1", [id]);
        res.json(oneEntreprise.rows);
    } catch (error) {
        console.log(error.message);
    }
}

exports.getProfil = async (req, res) => {
    const { id } = req.entreprise
    try {
        const oneEntreprise = await pool.query("SELECT * FROM entreprise WHERE id_entreprise=$1", [id]);
        res.json(oneEntreprise.rows[0]);
    } catch (error) {
        console.log("erreur", error.message);
        res.status(400).json(error)
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
        const { id } = req.entreprise; //récupère :id du token

         // on sélectionne l'entreprise' qui correspond à l'id
         let entreprise = await pool.query("SELECT * FROM entreprise WHERE id_entreprise=$1", [id])
         entreprise = entreprise.rows[0]
         if (!entreprise) {
             res.status(400).send("l'utilisateur n'existe pas")
             return false
         }
 
 
         // changer les attributs de l'entreprise par ceux du body
         for (const key in req.body) {
             if (req.body[key]) {
 
                 entreprise[key] = req.body[key]
             }
         }

        let { nom_entreprise,
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

            //validate mail
        if (!isEmail(email_entreprise)) {
            return [false, "invalid email"];
        }
        //hash the password
        if (req.body.mdp_entreprise) {
            mdp_entreprise = hashPassword(req.body.mdp_entreprise)
        }


        //si l'email existe déjà
        let emailExist = await pool.query("SELECT * FROM entreprise WHERE email_entreprise=$1 AND id_entreprise<>$2", [email_entreprise, id])
        if (emailExist.rowCount !== 0) {
            res.status(400).send("cet email est déjà utilisé")
            return false
        }

        let updateEntreprise = await pool.query("UPDATE entreprise SET nom_entreprise=$1, prenom_entreprise=$2, telephone_entreprise=$3, rue_entreprise=$4, cp_entreprise=$5, ville_entreprise=$6, siret=$7, raison_sociale=$8, code_ape=$9, email_entreprise=$10, mdp_entreprise=$11 WHERE id_entreprise=$12",

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

exports.putUpdateEntreprise = async (req, res) => {
    try {
        const { id } = req.entreprise; //récupère :id du token

         // on sélectionne l'entreprise' qui correspond à l'id
         let entreprise = await pool.query("SELECT * FROM entreprise WHERE id_entreprise=$1", [id])
         entreprise = entreprise.rows[0]
         if (!entreprise) {
             res.status(400).send("l'utilisateur n'existe pas")
             return false
         }
 
          // changer les attributs de l'entreprise par ceux du body
         for (const key in req.body) {
             if (req.body[key]) {
                 entreprise[key] = req.body[key]
             }
         }

        let { nom_entreprise,
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

            //validate mail
        if (!isEmail(email_entreprise)) {
            return [false, "invalid email"];
        }
        //hash the password
        if (req.body.mdp_entreprise) {
            mdp_entreprise = hashPassword(req.body.mdp_entreprise)
        }


        //si l'email existe déjà
        let emailExist = await pool.query("SELECT * FROM entreprise WHERE email_entreprise=$1 AND id_entreprise<>$2", [email_entreprise, id])
        if (emailExist.rowCount !== 0) {
            res.status(400).send("cet email est déjà utilisé")
            return false
        }

        let updateEntreprise = await pool.query("UPDATE entreprise SET nom_entreprise=$1, prenom_entreprise=$2, telephone_entreprise=$3, rue_entreprise=$4, cp_entreprise=$5, ville_entreprise=$6, siret=$7, raison_sociale=$8, code_ape=$9, email_entreprise=$10, mdp_entreprise=$11 WHERE id_entreprise=$12",

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
        delete updateEntreprise.mdp_entreprise
        updateEntreprise = updateEntreprise.rows[0]
        res.json(updateEntreprise)
    } catch (error) {
        console.log(error.message);
    }
}

exports.loginEntreprise = async (req, res) => {
    try {
        let {
            email_entreprise,
            mdp_entreprise
        } = req.body; // = const description = req.body.description

        //validate mail
        if (!isEmail(email_entreprise)) {
            res.status(400).send('email invalid')
        }

        //hash the password
        mdp_entreprise = hashPassword(mdp_entreprise)

        //vérifier si l'utilisateur existe

        let entreprise = await pool.query("SELECT * FROM entreprise WHERE email_entreprise=$1",
            [email_entreprise]);

        entreprise = entreprise.rows[0]

        if (!entreprise) {
            res.status(400).send('verifier vos identifiants')
            return false;
        }

        //comparer les mdp
        if (mdp_entreprise !== entreprise.mdp_entreprise) {
            res.status(400).send('verifier vos identifiants')
            return false;
        }

        let id = entreprise.id_entreprise
        //create the token
        const token = jwt.sign(
            {
                id, email_entreprise, mdp_entreprise
            },
            SECRET,
            {
                expiresIn: "720h",
            }
        )

        res.json({ ...entreprise, token })

    } catch (err) {
        console.log(err.message);
        res.json(err.message)
    }

}    

exports.listSalaries = async (req, res) => {
        try {
            const allSalarie = await pool.query("SELECT nom_salarie, prenom_salarie, id_salarie FROM salarie");
            res.json(allSalarie.rows);
        } catch (error) {
            console.log(error.message);
        }
    }