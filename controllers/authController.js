const AuthService = require("../services/authService");

async function getLogin(req, res) {
    res.status(200).render("login");
}

async function postLogin(req, res) {
    const userId = await AuthService.postLogin(req.body);

    if (userId == null) {
        return res.status(401).send("Invalid username or password");
    }

    return req.session.regenerate(error => {
        if (error) {
            return res.status(500).send("Internal server error");
        }

        req.session.userId = userId;

        req.session.save(error => {
            if (error) {
                return res.status(500).send("Internal server error");
            }

            return res.redirect(303, "/");
        });
    });
}

async function postLogout(req, res) {

}

module.exports = {
    getLogin,
    postLogin,
    postLogout
};