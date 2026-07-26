const errorHandler = (err, req, res, next) => {
    return res.status(err.status || 500)
    .json({
        success: false,
        message: err.message || "Internal server Error",
        errors: err.errors || [],
        data: null,
    });
}

export default errorHandler;