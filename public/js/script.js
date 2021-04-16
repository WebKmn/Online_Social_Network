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