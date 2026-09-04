const DB = require("../db/database");

async function getBookings() {
    try {
        const [rows] = await DB.execute(`SELECT bookings.customer_name, bookings.customer_email, bookings.start_time, bookings.status, treatments.name, treatments.duration_minutes
        FROM bookings
        INNER JOIN treatments ON bookings.treatment_id = treatments.id;`);

        return rows;
    }
    catch (error) {
        console.error(`Error fetching bookings: ${error}`);
        return null;
    }
}

async function createBooking(data) {
    try {
        const result = await DB.execute(`INSERT INTO bookings (customer_name, customer_email, treatment_id, start_time) VALUES (?, ?, ?, ?);`,
            [
                data.customer_name, data.customer_email, data.treatment_id, data.start_time
            ]
        );

        return result;
    }
    catch (error) {
        console.error(`Error creating booking: ${error}`);
        return null;
    }
}

module.exports = {
    createBooking,
    getBookings
};