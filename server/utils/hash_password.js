
const crypto = require("crypto")

function hashPassword(mdp_salarie) {
    let hashedPassword = crypto
        .createHash("sha256")
        .update(mdp_salarie)
        .digest("hex");

    return hashedPassword;
}

module.exports = hashPassword;