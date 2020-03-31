class WebError extends Error {
    constructor({ title, status, message }) {
        super(message)
        this.title = title;
        this.status = status;
    }

    static ErrorHandler(err, req, res, next) {
        console.error(err.stack);
        res.status(err.status || 500).json(err);
    }
}


module.exports = WebError;