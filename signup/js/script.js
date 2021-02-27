function updateAnsView() {
    var ddSecurityQuestion = document.getElementById("ddSecurityQuestion");
    var divAnswer = document.getElementById("divAnswer");

    if (ddSecurityQuestion.value != "") {
        divAnswer.classList.remove("invisible");
    }
    else {
        divAnswer.classList.add("invisible");
    }
}