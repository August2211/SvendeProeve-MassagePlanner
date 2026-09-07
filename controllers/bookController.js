const BookingService = require("../services/bookingService");
const TreatmentService = require("../services/treatmentService");


async function getBookForm(req, res) {
    try {
        const treatments = await TreatmentService.getTreatments();
        const availableTimes = await BookingService.getAvailableTimes(req.query.treatment_id);

        const selectedTreatment = treatments.find(treatment =>
            treatment.id == req.query.treatment_id
        );

        res.status(200).render("book", { treatments: treatments, availableTimes: availableTimes, selectedTreatment: selectedTreatment });
    }
    catch (error) {
        res.status(500).send("Internal server error");
        console.error(`Error fetching treatments: ${error}`);
    }
}

async function postBooking(req, res) {
    const treatments = await TreatmentService.getTreatments();
    const treatmentExists = treatments.some(treatment => {
        return treatment.id == req.body.treatment_id;
    });

    if(!treatmentExists) {
        console.error("Treatment doesn't exist");
        return res.status(500).send("Internal server error");
    }

    const bookingDate = new Date(req.body.start_time);
    const isValidDate = bookingDate.getTime() > Date.now();

    if(!isValidDate) {
        console.error("Invalid date");
        return res.status(500).send("Internal server error");
    }

    const customerName = req.body.customer_name.trim();
    const isValidName = customerName.length >= 2 && customerName.length <= 255;

    if(!isValidName) {
        console.error("Invalid name");
        return res.status(500).send("Internal server error");
    }

    // https://stackoverflow.com/a/46181
    const isValidEmail = req.body.customer_email.trim().toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if(!isValidEmail) {
        console.error("Invalid email");
        return res.status(500).send("Internal server error");
    }

    const availableTimes = await BookingService.getAvailableTimes(req.body.treatment_id);
    const isAvailable = availableTimes.some(time => {
        return bookingDate.getTime() == time.getTime();
    });

    if(!isAvailable) {
        console.error("Booking not available");
        return res.status(500).send("Internal server error");
    }

    const created = await BookingService.createBooking(req.body);
    if (created == null) {
        return res.status(500).send("Internal server error");
    }

    res.status(200).render("bookingConfirmation", { booking: req.body });
}

module.exports = {
    postBooking,
    getBookForm
};