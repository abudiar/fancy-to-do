class WebError extends Error {
    constructor({ name, status, message, err }) {
        super(message)
        this.name = name;
        this.status = status;
        this.err = err;
    }

    get Error() {
        if (this.err)
            return this.err;
        else
            return {
                name: this.name,
                message: this.message
            }
    }

    static errorHandler(err, req, res, next) {
        console.error(err.stack);
        switch (err.name) {
            case 'SequelizeValidationError':
                res.status(400).json(err);
                break;
            case "JsonWebTokenError":
                res.status(401).json(err.Error || err);
                break;
            default:
                res.status(err.status || 500).json('Internal Server Error');
                break;
        }
    }
}


module.exports = WebError;