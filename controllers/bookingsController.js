const BookingService = require("../services/bookingService");

async function getBookings(req, res) {

    const bookings = await BookingService.getBookings();
    if(bookings == null) {
        return res.status(500).send("Internal server error");
    }

    res.status(200).render("bookings", { bookings: bookings });
}

module.exports = {
    getBookings
};