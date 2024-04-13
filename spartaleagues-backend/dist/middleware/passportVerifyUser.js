'use strict';

var _user = require('./../mongoose/models/user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const config = require('./../configDb/database');

module.exports = function (passport) {

    let interfaceDbModel_User = _user2.default;

    let opts = {};

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

    opts.secretOrKey = config.secret;

    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        interfaceDbModel_User.findById(jwt_payload._id, { password: 0 }, (err, user) => {

            if (err) {
                return done(err, false);
            }

            if (user) {

                return done(null, user);
            } else {

                return done(null, false);
            }
        });
    }));
};
//# sourceMappingURL=passportVerifyUser.js.map