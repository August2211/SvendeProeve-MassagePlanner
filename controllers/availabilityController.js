const AvailabilityService = require("../services/availabilityService");

async function getAvailability(req, res) {
    const availabilities = await AvailabilityService.getAvailabilities();
    if (availabilities == null) {
        return res.status(500).send("Internal server error");
    }

    console.log(availabilities);

    res.status(200).render("availability", { availability: availabilities });
}

async function getAdminAvailability(req, res) {

    const availabilities = await AvailabilityService.getAvailabilities();
    if (availabilities == null) {
        return res.status(500).send("Internal server error");
    }

    console.log(availabilities);

    res.status(200).render("admin/availability", { availability: availabilities });
}

async function postAvailability(req, res) {
    const created = await AvailabilityService.createAvailability(req.body);

    if(created == null) {
        return res.status(500).send("Internal server error");
    }

    res.redirect(303, "/admin/availability");
}

module.exports = {
    getAvailability,
    getAdminAvailability,
    postAvailability
};