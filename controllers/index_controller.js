class IndexController {
    static getIndex(req, res) {
        res.status(200).json('Homepage :9');
    }
}

module.exports = IndexController;