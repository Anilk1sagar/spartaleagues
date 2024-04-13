'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {

    let userRoutes = (0, _user2.default)(app);

    return {
        register: userRoutes.register,
        authenticate: userRoutes.authenticate,
        update_password: userRoutes.update_password,
        profile: userRoutes.profile,
        publicUserProfile: userRoutes.publicUserProfile,
        updateUser: userRoutes.updateUser,
        searchUsers: userRoutes.searchUsers,
        getParticipantUser: userRoutes.getParticipantUser,
        getTeams: userRoutes.getTeams
    };
};
//# sourceMappingURL=index.js.map