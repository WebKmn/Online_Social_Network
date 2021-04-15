const httpStatus = require("http-status-codes")

exports.pageNotFoundError = (req, res) => {
    let errorCode = httpStatus.NOT_FOUND;
    res.status(errorCode);
    res.render("./errors/notFoundError");
}

exports.internalServerError = (error, req, res, next) => {
    let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
    res.status(errorCode);
    res.render("./errors/internalError");
    console.log(error.stack);
}