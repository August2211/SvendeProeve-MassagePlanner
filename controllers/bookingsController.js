const DB = require("../db/database");

async function showBookings(req, res) {
    try {
        const [rows] = await DB.execute(`SELECT bookings.customer_name, bookings.customer_email, bookings.start_time, bookings.status, treatments.name, treatments.duration_minutes
            FROM bookings
            INNER JOIN treatments ON bookings.treatment_id = treatments.id;`);

        res.render("bookings", { bookings: rows });
    }
    catch (error) {
        res.status(500).send("Internal server error");
        console.error(`Error fetching bookings: ${error}`);
    }
}

module.exports = {
    showBookings
};