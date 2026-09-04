const DB = require("../db/database");

async function getTreatments() {
    try {
        const [rows] = await DB.execute(`SELECT id, name, price, duration_minutes FROM treatments;`);

        return rows;
    }
    catch (error) {
        console.error(`Error fetching treatments: ${error}`);
        return null;
    }
}

module.exports = {
    getTreatments
};