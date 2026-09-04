function getIndex(req, res) {
    res.status(200).render("index");
}

module.exports = {
    getIndex
};