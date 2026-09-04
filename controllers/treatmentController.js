const TreatmentService = require("../services/treatmentService");

async function getTreatments(req, res) {
    try {
        const treatments = await TreatmentService.getTreatments();

        res.status(200).render("treatments", { treatments: treatments });
    }
    catch (error) {
        res.status(500).send("Internal server error");
        console.error(`Error fetching treatments: ${error}`);
    }
}

module.exports = {
    getTreatments
};