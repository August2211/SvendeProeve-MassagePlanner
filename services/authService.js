const DB = require("../db/database");
const argon2 = require("argon2");

async function postLogin(data) {
    try {
        const [rows] = await DB.execute("SELECT id, password_hash FROM users WHERE username = ?;", [data.username]);

        if(rows.length == 0) {
            console.error("User not found!");
            return null;
        }

        const matches = await argon2.verify(rows[0].password_hash, data.password);
        if(matches) {
            return rows[0].id;
        }
    }
    catch(error) {
        console.error("Failed to verify login", error);
        return null;
    }

    return null;
}

async function postLogout(req, res) {
    req.session.destroy(error => {
        if (error) {
            console.error(error);
            return res.status(500).send("Internal server error");
        }

        res.redirect("/auth/login");
    });
}

module.exports = {
    postLogin,
    postLogout
};