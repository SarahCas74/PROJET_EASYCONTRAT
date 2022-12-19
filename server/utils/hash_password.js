const crypto = require("crypto") //librairie express pour hasher le mdp

function hashPassword(mdp_salarie) {
    let hashedPassword = crypto
        .createHash("sha256")
        .update(mdp_salarie)
        .digest("hex");

    return hashedPassword;
}

function hashPassword(mdp_entreprise) {
    let hashedPassword = crypto
        .createHash("sha256")
        .update(mdp_entreprise)
        .digest("hex");

    return hashedPassword;
}


module.exports = hashPassword;