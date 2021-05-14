function updateAnsView() {
    var ddSecurityQuestion = document.getElementById("ddSecurityQuestion");
    var divAnswer = document.getElementById("divAnswer");

    if (ddSecurityQuestion.value != "Choose a security question") {
        divAnswer.classList.remove("invisible");
    }
    else {
        divAnswer.classList.add("invisible");
    }
}

function validateForm() {
    var formIsValid = true;

    var pw = document.querySelector("#txtPassword");
    var confirmPw = document.querySelector("#txtConfirmPass");

    pw.classList.remove("hasError");

    document.querySelectorAll('*').forEach(function (node) {
        node.classList.remove("hasError");
    });

    let errorElements = document.getElementsByClassName("errorMessage");
    for (let i = errorElements.length - 1; i >= 0; i--) {
        errorElements[i].remove();
    }

    var regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/g;

    //check for confirm password
    if (pw.value != confirmPw.value) {
        let divPwError = document.createElement("div");
        divPwError.innerHTML = "Passwords do not match.";
        divPwError.classList.add("errorMessage", "mb-3");

        pw.classList.add("hasError");
        confirmPw.classList.add("hasError");
        confirmPw.after(divPwError);
        formIsValid = false;

    }
    //check for password requirement
    else if (pw.value.match(regex) == null) {
        let divPwError = document.createElement("div");
        divPwError.innerHTML = "Password must have at least one capital letter, one small letter, and one number";
        divPwError.classList.add("errorMessage", "mb-3");
        pw.classList.add("hasError");
        pw.after(divPwError);
        formIsValid = false;
    }


    //check for invalid input
    var elements = document.getElementsByTagName("input");
    var invalidChars = ['<', '>', '#', "-", "{", "}", "(", ")", "'", '"', '`'];
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] == document.querySelector("#txtDOB")) {
            continue;
        }
        for (let j = 0; j < invalidChars.length; j++) {
            if (elements[i].value.indexOf(invalidChars[j]) != -1) {
                elements[i].classList.add("hasError");
                let divInvalidChar = document.createElement("div");
                divInvalidChar.innerHTML = "Invalid Characters: <, >, #, -, {, }, (), ', `";
                divInvalidChar.classList.add("errorMessage", "mb-3");
                elements[i].after(divInvalidChar);
                formIsValid = false;
                break;
            }
        }
    }
}