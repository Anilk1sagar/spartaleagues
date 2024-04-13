'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _send = require('./send');

var _send2 = _interopRequireDefault(_send);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {

    let sendRoutes = (0, _send2.default)(app);

    return {
        contact: sendRoutes.contact,
        resetPassword: sendRoutes.resetPassword,
        sendTeamInvite: sendRoutes.sendTeamInvite,
        paymentInvoice: sendRoutes.paymentInvoice
    };
};
//# sourceMappingURL=index.js.map