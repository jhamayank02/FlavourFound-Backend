const globalErrorHandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    res.status(error.statusCode).json({
        status: error.statusCode,
        msg: error.message
    })
}

module.exports = globalErrorHandler;