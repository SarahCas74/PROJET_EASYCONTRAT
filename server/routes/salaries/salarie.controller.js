const SECRET = require("../../config")
const jwt = require("jsonwebtoken")
const { isEmail } = require("validator")
const pool = require("../../db.js"); // Exécuter le code et renvoi l’objet
const hashPassword = require('../../utils/hash_password')

exports.createSalarie = async (req, res) => {

    try {
        ;
        let {
            nom_salarie,
            prenom_salarie,
            telephone_salarie,
            rue_salarie,
            cp_salarie,
            ville_salarie,
            num_ss,
            date_naissance,
            lieu_naissance,
            nom_jeune_fille,
            email_salarie,
            mdp_salarie
        } = req.body; // = const description = req.body.description

        //validate mail
        if (!isEmail(email_salarie)) {
            return [false, "invalid email"];
        }

        //hash the password
        mdp_salarie = hashPassword(mdp_salarie)

        let salarie = await pool.query(
            "INSERT INTO salarie (nom_salarie,prenom_salarie,telephone_salarie,rue_salarie,cp_salarie,ville_salarie,num_ss,date_naissance,lieu_naissance,nom_jeune_fille, email_salarie, mdp_salarie) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
            [
                nom_salarie,
                prenom_salarie,
                telephone_salarie,
                rue_salarie,
                cp_salarie,
                ville_salarie,
                num_ss,
                date_naissance,
                lieu_naissance,
                nom_jeune_fille,
                email_salarie,
                mdp_salarie
            ]
        );

        salarie = salarie.rows[0]

        //create the token
        const token = jwt.sign(
            {
                email_salarie, mdp_salarie
            },
            SECRET,
            {
                expiresIn: "720h",
            }
        )

        res.json({ ...salarie, token }); //renvoie la réponse en string
    } catch (err) {
        console.log(err.message);
        res.json(err.message)
    }
}

exports.listSalarie = async (req, res) => {
    try {
        const allSalarie = await pool.query("SELECT * FROM salarie");
        res.json(allSalarie.rows);
    } catch (error) {
        console.log(error.message);
    }
}

exports.oneSalarie = async (req, res) => {
    try {
        const allSalarie = await pool.query("SELECT * FROM salarie");
        res.json(allSalarie.rows);
    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteSalarie = async (req, res) => {
    try {
        const { id } = req.params; //récupère :id
        const deleteSalarie = await pool.query("DELETE FROM salarie WHERE id_salarié = $1", [id]);
        res.json("Salarie was deleted !")
    } catch (error) {
        console.log(error.message);
    }
}

exports.updateSalarie = async (req, res) => {
    try {
        const { id } = req.params; //récupère :id
        const { nom_salarie,
            prenom_salarie,
            telephone_salarie,
            rue_salarie,
            cp_salarie,
            ville_salarie,
            num_ss,
            date_naissance,
            lieu_naissance,
            nom_jeune_fille,
            email_salarie,
            mdp_salarie } = req.body;

        const updateSalarie = await pool.query("UPDATE salarie SET nom_salarie=$1, prenom_salarie=$2, telephone_salarie=$3, rue_salarie=$4, cp_salarie=$5, ville_salarie=$6, num_ss=$7, date_naissance=$8, lieu_naissance=$9, nom_jeune_fille=$10, email_salarie=$11, mdp_salarie=$12 WHERE id_salarié=$13",

            [nom_salarie,
                prenom_salarie,
                telephone_salarie,
                rue_salarie,
                cp_salarie,
                ville_salarie,
                num_ss,
                date_naissance,
                lieu_naissance,
                nom_jeune_fille,
                email_salarie,
                mdp_salarie, id]
        );
        res.json("Salarie was updated!")
    } catch (error) {
        console.log(error.message);
    }
}

exports.login = async (req, res) => {
    try {
        ;
        let {
            email_salarie,
            mdp_salarie
        } = req.body; // = const description = req.body.description

        //validate mail
        if (!isEmail(email_salarie)) {
            res.status(400).send('email invalid')
        }

        //hash the password
        mdp_salarie = hashPassword(mdp_salarie)

        //vérifier si l'utilisateur existe

        let salarie = await pool.query("SELECT * FROM salarie WHERE email_salarie=$1", 
        [email_salarie]);

        salarie = salarie.rows[0]

        if (!salarie) {
            res.status(400).send('verifier vos identifiants')
            return false;
        }

        //comparer les mdp
        if (mdp_salarie !== salarie.mdp_salarie) {
            res.status(400).send('verifier vos identifiants')
            return false;
        }


        //create the token
        const token = jwt.sign(
            {
                email_salarie, mdp_salarie
            },
            SECRET,
            {
                expiresIn: "720h",
            }
        )

        res.json({...salarie, token})

    } catch (err) {
        console.log("------------------------------------------");
        console.log(err.message);
        res.json(err.message)
    }



    
}

