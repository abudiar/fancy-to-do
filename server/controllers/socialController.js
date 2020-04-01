const { User } = require('../models');
const { WebError } = require('../middleware');
const { googleKey, googleClientId } = require('../constants');
const { Crypto } = require('../helpers');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(googleClientId);

class SocialController {
    static loginGoogle(req, res, next) {
        const { token } = req.body;
        let userData, email, name, picture;
        client.verifyIdToken({
            idToken: token,
            audiences: googleClientId
        })
            .then((ticket) => {
                console.log(ticket)
                const { email, name, picture, sub, jti } = ticket.payload
                userData = {
                    email,
                    name,
                    password: Crypto.hashPassword(jti),
                    use_google: true
                };
                return User.findOne({ where: { email: email } })
            })
            .then((user) => {
                if (!user)
                    return User.create(userData)
                else
                    return user
            })
            .then(success => {
                res.status(201).json({
                    accessToken: jwt.sign({
                        UserId: userData.id,
                        email: userData.email
                    }, privateKey),
                    name: userData.name
                });
            })
            .catch(next)
    }
}

module.exports = SocialController;