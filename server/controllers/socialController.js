const { User } = require('../models');
const { WebError } = require('../middleware');
const { privateKey, googleKey, googleClientId } = require('../constants');
const { Crypto } = require('../helpers');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(googleClientId);

class SocialController {
    static loginGoogle(req, res, next) {
        const { token, password, email, name } = req.body;
        let userData;
        client.verifyIdToken({
            idToken: token,
            audiences: googleClientId
        })
            .then((ticket) => {
                console.log(ticket)
                const { email, picture, sub, jti } = ticket.payload
                userData = {
                    email,
                    name,
                    use_google: true
                }
                if (password)
                    return Crypto.hashPassword(password);
                else
                    return Crypto.hashPassword(jti);
            })
            .then((hashPassword) => {
                userData['password'] = hashPassword;
                return User.findOne({ where: { email: userData.email } });
            })
            .then((user) => {
                if (password) {
                    if (email === user.email) {
                        user.password = userData['password'];
                        user.save();
                    }
                    else {
                        throw new WebError({
                            name: 'EmailDoesNotMatch',
                            status: 401,
                            message: 'Email does not match!'
                        })
                    }
                }
                if (!user)
                    return User.create(userData)
                else
                    return user
            })
            .then(user => {
                // // console.log(user)
                res.status(201).json({
                    accessToken: jwt.sign({
                        UserId: user.id,
                        email: user.email
                    }, privateKey),
                    name: user.name
                });
            })
            .catch(next)
    }
}

module.exports = SocialController;