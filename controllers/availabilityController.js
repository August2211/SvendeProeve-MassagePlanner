const AvailabilityService = require("../services/availabilityService");

async function getAvailability(req, res) {
    const availabilities = await AvailabilityService.getAvailabilities();
    if (availabilities == null) {
        return res.status(500).send("Internal server error");
    }

    res.status(200).render("availability", { availability: availabilities });
}

async function getAdminAvailability(req, res) {

    const availabilities = await AvailabilityService.getAvailabilities();
    if (availabilities == null) {
        return res.status(500).send("Internal server error");
    }

    res.status(200).render("admin/availability", { availability: availabilities });
}

async function postAvailability(req, res) {
    const created = await AvailabilityService.createAvailability(req.body);

    if (created == null) {
        return res.status(500).send("Internal server error");
    }

    res.redirect(303, "/admin/availability");
}

async function getEditAvailability(req, res) {
    const availability = (await AvailabilityService.getAvailabilities()).find(availability => { return availability.id == req.params.id });

    //https://stackoverflow.com/a/60884408

    const start_time = new Date(availability.start_time - availability.start_time.getTimezoneOffset() * 60000);
    const end_time = new Date(availability.end_time - availability.end_time.getTimezoneOffset() * 60000);

    start_time.setSeconds(null);
    start_time.setMilliseconds(null);

    end_time.setSeconds(null);
    end_time.setMilliseconds(null);



    res.status(200).render("admin/editAvailability", { availability: availability, start_time_value: start_time.toISOString().slice(0, -1), end_time_value: end_time.toISOString().slice(0, -1) });
}

async function postEditAvailability(req, res) {
    req.body.id = req.params.id;
    const updated = AvailabilityService.editAvailability(req.body);

    if (updated == null) {
        return res.status(500).send("Internal server error");
    }

    res.redirect(303, "/admin/availability");
}

async function postDeleteAvailability(req, res) {
    const deleted = await AvailabilityService.deleteAvailability(req.params);

    if (deleted == null) {
        return res.status(500).send("Internal server error");
    }

    res.redirect(303, "/admin/availability");
}

module.exports = {
    getAvailability,
    getAdminAvailability,
    postAvailability,
    getEditAvailability,
    postEditAvailability,
    postDeleteAvailability
};