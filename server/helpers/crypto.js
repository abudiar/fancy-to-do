const bcrypt = require('bcrypt');
const { WebError } = require('../middleware');
const saltRounds = 8;

class Crypto {
    static hashPassword(plainPassword) {
        return new Promise((resolve, reject) => {
            console.log(plainPassword, saltRounds)
            bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
                return err ? reject(new WebError({
                    name: 'HashFailed',
                    message: err.message
                })) : resolve(hash);
            });
        });
    }

    static comparePassword(plainPassword, hashPassword) {
        return new Promise((resolve, reject) => {
            bcrypt.compare(plainPassword, hashPassword, function (err, result) {
                return err ? reject(new WebError({
                    name: 'CompareFailed',
                    message: err.message
                })) : resolve(result);
            });
        });
    }
}

module.exports = Crypto;
