const DB = require("../db/database");

async function showTreatments(req, res) {
    try {
        const [rows] = await DB.execute(`SELECT name, price, duration_minutes FROM treatments;`);

        res.render("treatments", { treatments: rows });
    }
    catch (error) {
        res.status(500).send("Internal server error");
        console.error(`Error fetching treatments: ${error}`);
    }
}

module.exports = {
    showTreatments
};