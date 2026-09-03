const DB = require("../db/database");

async function showBookForm(req, res) {
    try {
        const [rows] = await DB.execute(`SELECT id, name, price, duration_minutes FROM treatments;`);

        res.render("book", { treatments: rows });
    }
    catch (error) {
        res.status(500).send("Internal server error");
        console.error(`Error fetching treatments: ${error}`);
    }
}

async function createBooking(req, res) {
    try {
        const [rows] = await DB.execute(`INSERT INTO bookings (customer_name, customer_email, treatment_id, start_time) VALUES (?, ?, ?, ?);`,
            [
                req.body.customer_name, req.body.customer_email, req.body.treatment_id, req.body.start_time
            ]
        );

        res.status(200).send("Created booking successfully!");
    }
    catch (error) {
        res.status(500).send("Internal server error");
        console.error(`Error creating booking: ${error}`);
    }
}

module.exports = {
    createBooking,
    showBookForm
};