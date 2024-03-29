const pool = require("../../db.js"); // Exécuter le code et renvoi l’objet

exports.createContrat = async (req, res) => {
    try {
        ;
        const {
            type_,
            is_fullTime,
            date_debut,
            date_fin,
            periode_fin_essai,
            remuneration,
            motif,
            fonction,
            statut,
            fk_entreprise,
            fk_salarie,
            nom_remplacement,
            fonction_remplacement,
            motif_surcroit,
            lundi,
            mardi,
            mercredi,
            jeudi,
            vendredi,
            samedi,
            dimanche,
            total_heure
        } = req.body; // = const description = req.body.description
        const contrat = await pool.query(
            "INSERT INTO contrat (type_,\"is_fullTime\",date_debut,date_fin,periode_fin_essai,remuneration,motif, fonction,statut, fk_entreprise, fk_salarie,nom_remplacement,fonction_remplacement,motif_surcroit,lundi,mardi,mercredi,jeudi,vendredi,samedi,dimanche,total_heure) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22) RETURNING *",
            [
                type_,
                is_fullTime,
                date_debut,
                date_fin,
                periode_fin_essai,
                remuneration,
                motif,
                fonction,
                statut,
                fk_entreprise,
                fk_salarie,
                nom_remplacement,
                fonction_remplacement,
                motif_surcroit,
                lundi,
                mardi,
                mercredi,
                jeudi,
                vendredi,
                samedi,
                dimanche,
                total_heure
            ]
        );

        res.json(contrat); //renvoie la réponse en string
    } catch (err) {
        console.log(err.message);
    }
}
// export.modules=createContrat autre possibilité d'exporter la constante

exports.listContrat = async (req, res) => {
    try {
        const allcontrat = await pool.query("SELECT * FROM contrat");
        res.json(allcontrat.rows);
    } catch (error) {
        console.log(error.message);
    }
}

exports.oneContrat = async (req, res) => {
    try {
        const oneContrat = await pool.query("SELECT * FROM entreprise INNER JOIN contrat on entreprise.id_entreprise=contrat.fk_entreprise INNER JOIN salarie on salarie.id_salarie = contrat.fk_salarie");
        res.json(oneContrat.rows);
    } catch (error) {
        console.log(error.message);
    }
}

exports.deleteContrat = async (req, res) => {
    try {
        const { id } = req.params; //récupère :id
        const deletecontrat = await pool.query("DELETE FROM contrat WHERE id_contrat = $1", [id]);
        res.json("contrat was deleted !")
    } catch (error) {
        console.log(error.message);
    }
}

exports.updateContrat = async (req, res) => {
    try {
        const { id } = req.params; //récupère :id
        const { type_,
            is_fullTime,
            date_debut,
            date_fin,
            periode_fin_essai,
            remuneration,
            motif,
            fonction,
            statut,
            fk_entreprise,
            fk_salarie,
            nom_remplacement,
            fonction_remplacement,
            motif_surcroit,
            lundi,
            mardi,
            mercredi,
            jeudi,
            vendredi,
            samedi,
            dimanche,
            total_heure } = req.body;

        const updateContrat = await pool.query("UPDATE contrat SET type_=$1, \"is_fullTime\"=$2, date_debut=$3, date_fin=$4, periode_fin_essai=$5, remuneration=$6, motif=$7, fonction=$8, statut=$9, fk_entreprise=$10, fk_salarie=$11, nom_remplacement=$12,fonction_remplacement=$13,motif_surcroit=$14,lundi=$15,mardi=$16,mercredi=$17,jeudi=$18,vendredi=$19,samedi=$20,dimanche=$21,total_heure=$22 WHERE id_contrat=$23",

            [type_,
                is_fullTime,
                date_debut,
                date_fin,
                periode_fin_essai,
                remuneration,
                motif,
                fonction,
                statut,
                fk_entreprise,
                fk_salarie,
                nom_remplacement,
                fonction_remplacement,
                motif_surcroit,
                lundi,
                mardi,
                mercredi,
                jeudi,
                vendredi,
                samedi,
                dimanche,
                total_heure,
                id]
        );
        res.json("Contrat was updated!")
    } catch (error) {
        console.log(error.message);
    }
}
