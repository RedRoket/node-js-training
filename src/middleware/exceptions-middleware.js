module.exports = (err, req, res, next) => {
    if (!err.statusCode) {
        res.status(500).json({
            message: err.message
        });
    }

    res.status(err.statusCode).json({
        message: err.message
    });
};