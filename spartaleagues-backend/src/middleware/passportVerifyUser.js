const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
import User from './../mongoose/models/user';
const config = require('./../configDb/database');

module.exports = function(passport) {

    let interfaceDbModel_User = User;

    let opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        interfaceDbModel_User.findById(jwt_payload._id, {password: 0}, (err, user) => {

            if(err) {
                return done(err, false);
            }

            if(user) {

                return done(null, user);
            } else {

                return done(null, false);
            }
        });
    }));
}
