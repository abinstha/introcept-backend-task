const form = document.querySelector('form');
const errorDOM = document.querySelectorAll('.error');
const successAlertDOM = document.querySelector('.alert-success');


// capture the submit event on the form to send data
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    
    //clear the error messages
    for (let i = 0; i < errorDOM.length; i++) {
        errorDOM[i].innerHTML = '';
    }
    
    // serailize the data
    let object = {};
    formData.forEach(function (value, key) {
        object[key] = value;
    });
    object["hobbies"] = getCheckBoxValue();
    try {
        await axios.post('/', JSON.stringify(object), { headers: { 'Content-Type': 'application/json' } })
        successAlertDOM.classList.remove('d-none')
        setTimeout(() => successAlertDOM.classList.add('d-none'), 2000)
    } catch (error) {
        if (error.response) {
            if (error.response.status == 422) {
                let errors = error.response.data.errors;
                Object.keys(errors).forEach((key, error) => {
                    let inputElemName = Object.keys(errors[key]);
                    let parentDOM = document.querySelector(`input[name='${inputElemName[0]}']`).closest('.form-group');
                    let errorElem = parentDOM.querySelector('.error');
                    errorElem.innerHTML = errors[key][inputElemName[0]];
                })
            }
        }
    }
})

// get values from checked items in a checkbox
const getCheckBoxValue = () => {
    let checks = document.querySelectorAll(".hobbies-group input[type='checkbox']");
    let hobbyInput = document.querySelector(".hobbies-group input[type='text']");
    let obj = {}
    for (let i = 0; i < checks.length; i++) {
        if (checks[i].checked == true) {
            obj[i] = checks[i].value;
        }
    }
    if (hobbyInput.value != '') {
        obj[Object.keys(obj).length] = hobbyInput.value;
    }
    return JSON.stringify(obj);
}
