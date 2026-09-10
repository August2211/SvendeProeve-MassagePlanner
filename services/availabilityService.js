const DB = require("../db/database");

async function getAvailabilities() {
    try {
        const [rows] = await DB.execute(`SELECT id, start_time, end_time FROM availability;`);

        return rows;
    }
    catch (error) {
        console.error(`Error fetching availability: ${error}`);
        return null;
    }
}

async function createAvailability(data) {
    try {
        if (new Date(data.start_time).getTime() >= new Date(data.end_time).getTime()) {
            return null;
        }

        const result = await DB.execute(`INSERT INTO availability (start_time, end_time) VALUES (?, ?);`,
            [
                data.start_time, data.end_time
            ]
        );

        return result;
    }
    catch (error) {
        console.error(`Error creating availability: ${error}`);
        return null;
    }
}

async function editAvailability(data) {
    try {
        const result = await DB.execute(`UPDATE availability SET start_time = ?, end_time = ? WHERE id = ?;`,
            [
                data.start_time, data.end_time, data.id
            ]
        );

        return result;
    }
    catch (error) {
        console.error(`Error editing availability: ${error}`);
        return null;
    }
}

async function deleteAvailability(data) {
    try {
        const result = await DB.execute(`DELETE FROM availability WHERE id = ?;`,
            [
                data.id
            ]
        );

        return result;
    }
    catch (error) {
        console.error(`Error deleting availability: ${error}`);
        return null;
    }
}

module.exports = {
    createAvailability,
    getAvailabilities,
    editAvailability,
    deleteAvailability
};