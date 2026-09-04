const BookingService = require("../services/bookingService");
const TreatmentService = require("../services/treatmentService");


async function getBookForm(req, res) {
    try {
        const treatments = await TreatmentService.getTreatments();

        res.status(200).render("book", { treatments: treatments });
    }
    catch (error) {
        res.status(500).send("Internal server error");
        console.error(`Error fetching treatments: ${error}`);
    }
}

async function postBooking(req, res) {
    const created = BookingService.createBooking(req.body);
    if(created == null) {
        return res.status(500).send("Internal server error");
    }

    res.status(200).render("bookingConfirmation", { booking: req.body });
}

module.exports = {
    postBooking,
    getBookForm
};