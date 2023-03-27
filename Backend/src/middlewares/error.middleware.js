module.exports = (error, req, res, next) => {
    const httpsStatus = error.status || 500;
    return res.status(httpsStatus).send(
        {
            status: httpsStatus,
            message: error.message || "Server error"
        }
    )
};