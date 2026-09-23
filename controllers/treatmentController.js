const TreatmentService = require("../services/treatmentService");

async function getTreatments(req, res) {
    try {
        const treatments = await TreatmentService.getTreatments();

        if(treatments == null)
        {
            res.status(500).send("Internal server error");
            return;
        }
        
        res.status(200).render("treatments", { treatments: treatments });
    }
    catch (error) {
        res.status(500).send("Internal server error");
        console.error(`Error fetching treatments: ${error}`);
    }
}

async function getAdminTreatment(req, res) {
    const treatments = await TreatmentService.getTreatments();

    res.status(200).render("admin/treatments", { treatments: treatments });
}

async function getEditTreatment(req, res) {
    const treatment = (await TreatmentService.getTreatments()).find(treatment => { return treatment.id == req.params.id });

    res.status(200).render("admin/editTreatments", { treatment: treatment });
}

async function postEditTreatment(req, res) {
    req.body.id = req.params.id;
    const edited = TreatmentService.editTreatment(req.body);

    if(edited == null) {
        return res.status(500).send("Internal server error");
    }

    res.redirect(303, "/admin/treatments");
}

async function postDeleteTreatment(req, res) {
    const deleted = TreatmentService.deleteTreatment(req.params);

    if(deleted == null) {
        return res.status(500).send("Internal server error");
    }

    res.redirect(303, "/admin/treatments");
}

async function postTreatment(req, res) {
    const created = await TreatmentService.createTreatment(req.body);

    if(created == null) {
        return res.status(500).send("Internal server error");
    }

    res.redirect(303, "/admin/treatments");
}

module.exports = {
    getTreatments,
    getAdminTreatment,
    getEditTreatment,
    postEditTreatment,
    postDeleteTreatment,
    postTreatment
};