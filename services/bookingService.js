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
                data.customer_name.trim(), data.customer_email.trim().toLowerCase(), data.treatment_id, new Date(data.start_time)
            ]
        );

        return result;
    }
    catch (error) {
        console.error(`Error creating booking: ${error}`);
        return null;
    }
}

async function getAvailableTimes(treatment_id) {
    try {
        const [availabilityRows] = await DB.execute(`SELECT availability.start_time, availability.end_time FROM availability;`);

        const [bookingRows] = await DB.execute(`SELECT bookings.start_time, treatments.duration_minutes
            FROM bookings
            INNER JOIN treatments ON bookings.treatment_id = treatments.id
            WHERE bookings.status = 'active';`);

        const [treatmentRows] = await DB.execute(`SELECT treatments.duration_minutes
            FROM treatments
            WHERE treatments.id = ?;`, [treatment_id]);


        const availableTimes = [];
        const duration = treatmentRows[0].duration_minutes;
        const now = new Date();

        availabilityRows.forEach(availability => {
            let startTime = availability.start_time;
            while (true) {
                const end = new Date(startTime.getTime() + duration * 60 * 1000);

                if (end > availability.end_time)
                    break;

                const overlaps = bookingRows.some(booking => {
                    const bookingEnd = new Date(booking.start_time.getTime() + booking.duration_minutes * 60 * 1000);

                    return startTime < bookingEnd && end > booking.start_time;
                });

                if (!overlaps && startTime >= now)
                    availableTimes.push(startTime)

                startTime = new Date(startTime.getTime() + 30 * 60 * 1000)
            }
        });

        return availableTimes;
    }
    catch (error) {
        console.error(`Error fetching bookings: ${error}`);
        return null;
    }
}

module.exports = {
    createBooking,
    getBookings,
    getAvailableTimes
};