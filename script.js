
function areFieldsComplete() {
    for (const input_field of document.getElementById("contact-form")) {
        // console.log(input_field)
        if (!input_field.value.trim())
            return false
    }
    return true
}

function validateFormFields() {
    console.log("Los campos del forulario", (areFieldsComplete() ? "Sí" : "NO"), "están completos")
}

validateFormFields()
