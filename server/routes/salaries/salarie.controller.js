const SECRET = require("../../config")
const jwt = require("jsonwebtoken")
const { isEmail } = require("validator")
const pool = require("../../db.js"); // Exécuter le code et renvoi l’objet
const hashPassword = require('../../utils/hash_password')

exports.createSalarie = async (req, res) => {
    try {
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

        //vérifier si l'utilisateur existe

        let salarie = await pool.query("SELECT * FROM salarie WHERE email_salarie=$1",
            [email_salarie]);

        salarie = salarie.rows[0]


        if (salarie) {
            res.status(400).send('cette adresse mail est déjà utilisée')
            return false;
        }
         
        salarie = await pool.query(
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
        let id = salarie.id_salarie
        //create the token
        const token = jwt.sign(
            {
                id, email_salarie, mdp_salarie
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
    const { id } = req.params
    try {
        const oneSalarie = await pool.query("SELECT * FROM salarie WHERE id_salarie=$1", [id]);
        res.json(oneSalarie.rows[0]);
    } catch (error) {
        console.log(error.message);
    }
}

exports.getProfil = async (req, res) => {
    const { id } = req.salarie
    try {
        const oneSalarie = await pool.query("SELECT * FROM salarie WHERE id_salarie=$1", [id]);
        res.json(oneSalarie.rows[0]);
    } catch (error) {
        console.log("erreur", error.message);
        res.status(400).json(error)
    }

}

exports.deleteSalarie = async (req, res) => {
    try {
        const { id } = req.params; //récupère :id
        const deleteSalarie = await pool.query("DELETE FROM salarie WHERE id_salarie = $1", [id]);
        res.json("Salarie was deleted !")
    } catch (error) {
        console.log(error.message);
    }
}

exports.updateSalarie = async (req, res) => {
    try {
        const { id } = req.salarie //récupérer l'id du token

        // on sélectionne le salarié qui correspond à l'id
        let salarie = await pool.query("SELECT * FROM salarie WHERE id_salarie=$1", [id])
        salarie = salarie.rows[0]
        if (!salarie) {
            res.status(400).send("l'utilisateur n'existe pas")
            return false
        }


        // changer les attributs de salarié par ceux du body
        for (const key in req.body) {
            if (req.body[key]) {

                salarie[key] = req.body[key]
            }
        }

        let { nom_salarie,
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
            mdp_salarie } = salarie;

        //validate mail
        if (!isEmail(email_salarie)) {
            return [false, "invalid email"];
        }
        //hash the password
        if (req.body.mdp_salarie) {
            mdp_salarie = hashPassword(req.body.mdp_salarie)
        }


        //si l'email existe déjà
        let emailExist = await pool.query("SELECT * FROM salarie WHERE email_salarie=$1 AND id_salarie<>$2", [email_salarie, id])
        if (emailExist.rowCount !== 0) {
            res.status(400).send("cet email est déjà utilisé")
            return false
        }


        let updateSalarie = await pool.query("UPDATE salarie SET nom_salarie=$1, prenom_salarie=$2, telephone_salarie=$3, rue_salarie=$4, cp_salarie=$5, ville_salarie=$6, num_ss=$7, date_naissance=$8, lieu_naissance=$9, nom_jeune_fille=$10, email_salarie=$11, mdp_salarie=$12 WHERE id_salarie=$13",

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

exports.putUpdateSalarie = async (req, res) => {
    try {
        const { id } = req.salarie //récupérer l'id du token

        // on sélectionne le salarié qui correspond à l'id
        let salarie = await pool.query("SELECT * FROM salarie WHERE id_salarie=$1", [id])
        salarie = salarie.rows[0]
        if (!salarie) {
            res.status(400).send("l'utilisateur n'existe pas")
            return false
        }

        // changer les attributs de salarié par ceux du body
        for (const key in req.body) {
            if (req.body[key]) {
                salarie[key] = req.body[key]
            }
        }

        let { nom_salarie,
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
            mdp_salarie } = salarie;

        //validate mail
        if (!isEmail(email_salarie)) {
            return [false, "invalid email"];
        }
        //hash the password
        if (req.body.mdp_salarie) {
            mdp_salarie = hashPassword(req.body.mdp_salarie)
        }


        //si l'email existe déjà
        let emailExist = await pool.query("SELECT * FROM salarie WHERE email_salarie=$1 AND id_salarie<>$2", [email_salarie, id])
        if (emailExist.rowCount !== 0) {
            res.status(400).send("cet email est déjà utilisé")
            return false
        }



        let updateSalarie = await pool.query("UPDATE salarie SET nom_salarie=$1, prenom_salarie=$2, telephone_salarie=$3, rue_salarie=$4, cp_salarie=$5, ville_salarie=$6, num_ss=$7, date_naissance=$8, lieu_naissance=$9, nom_jeune_fille=$10, email_salarie=$11, mdp_salarie=$12 WHERE id_salarie=$13 RETURNING *",

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
        delete updateSalarie.mdp_salarie
        updateSalarie = updateSalarie.rows[0]
        res.json(updateSalarie)
    } catch (error) {
        console.log(error.message);
    }
}

exports.loginSalarie = async (req, res) => {
    try {
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

        let id = salarie.id_salarie
        //create the token
        const token = jwt.sign(
            {
                id, email_salarie, mdp_salarie
            },
            SECRET,
            {
                expiresIn: "720h",
            }
        )
        res.json({ ...salarie, token, })

    } catch (err) {
        console.log(err.message);
        res.json(err.message)
    }




}

