function updateAnsView() {
    var ddSequrityQuestion = document.getElementById("ddSequrityQuestion");
    var divAnswer = document.getElementById("divAnswer");

    if (ddSequrityQuestion.value != "") {
        divAnswer.classList.remove("invisible");
    }
    else {
        divAnswer.classList.add("invisible");
    }
}