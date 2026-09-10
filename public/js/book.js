const treatmentSelect = document.getElementById("treatment");

treatmentSelect.addEventListener("change", () => {
    if (treatmentSelect.value) {
        window.location.href = "/book?treatment_id=" + treatmentSelect.value;
    }
    else {
        window.location.href = "/book";
    }
});