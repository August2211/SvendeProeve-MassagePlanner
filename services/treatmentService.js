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

async function createTreatment(data) {
    try {
        const created = await DB.execute(`INSERT INTO treatments (name, price, duration_minutes) VALUES (?, ?, ?);`, [data.name, data.price, data.duration_minutes]);

        return created;
    }
    catch (error) {
        console.error(`Error creating treatment: ${error}`);
        return null;
    }
}

async function editTreatment(data) {
    try {
        const edited = await DB.execute(`UPDATE treatments SET name = ?, price = ?, duration_minutes = ? WHERE id = ?;`, [data.name, data.price, data.duration_minutes, data.id]);

        return edited;
    }
    catch (error) {
        console.error(`Error creating treatment: ${error}`);
        return null;
    }
}

async function deleteTreatment(data) {
    try {
        const deleted = await DB.execute(`DELETE FROM treatments WHERE id = ?;`, [data.id]);

        return deleted;
    }
    catch (error) {
        console.error(`Error creating treatment: ${error}`);
        return null;
    }
}

module.exports = {
    getTreatments,
    createTreatment,
    editTreatment,
    deleteTreatment
};