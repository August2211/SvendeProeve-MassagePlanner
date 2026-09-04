const DB = require("../db/database");

async function getAvailabilities() {
    try {
        const [rows] = await DB.execute(`SELECT start_time, end_time FROM availability;`);

        return rows;
    }
    catch (error) {
        console.error(`Error fetching availability: ${error}`);
        return null;
    }
}

async function createAvailability(data) {
    try {
        if (new Date(data.start_time) >= new Date(data.end_time)) {
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

module.exports = {
    createAvailability,
    getAvailabilities
};