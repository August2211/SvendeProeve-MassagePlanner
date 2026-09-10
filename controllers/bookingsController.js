const BookingService = require("../services/bookingService");
const TreatmentService = require("../services/treatmentService");

async function getBookings(req, res) {
    const bookings = await BookingService.getBookings();
    if (bookings == null) {
        return res.status(500).send("Internal server error");
    }
    
    res.status(200).render("admin/bookings", { bookings: bookings });
}

async function getEditBooking(req, res) {
    const booking = (await BookingService.getBookings()).find(booking => { return booking.id == req.params.id });

    //https://stackoverflow.com/a/60884408

    const start_time = new Date(booking.start_time - booking.start_time.getTimezoneOffset() * 60000);

    start_time.setSeconds(null);
    start_time.setMilliseconds(null);

    const treatments = await TreatmentService.getTreatments();

    res.status(200).render("admin/editBookings", { booking: booking, start_time_value: start_time.toISOString().slice(0, -1), treatments: treatments });
}

async function postEditBooking(req, res) {
    req.body.id = req.params.id;
    const updated = BookingService.editBooking(req.body);

    if (updated == null) {
        return res.status(500).send("Internal server error");
    }

    res.redirect(303, "/admin/bookings");
}

async function postDeleteBooking(req, res) {
    const deleted = await BookingService.deleteBooking(req.params);

    if (deleted == null) {
        return res.status(500).send("Internal server error");
    }

    res.redirect(303, "/admin/bookings");
}

module.exports = {
    getBookings,
    getEditBooking,
    postEditBooking,
    postDeleteBooking
};