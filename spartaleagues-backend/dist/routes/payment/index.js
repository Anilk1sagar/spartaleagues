'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _payments = require('./payments');

var _payments2 = _interopRequireDefault(_payments);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {

    let payment = (0, _payments2.default)(app);

    return {
        createHash: payment.createHash,
        paymentStatus: payment.paymentStatus,
        checkTeamName: payment.checkTeamName,
        addParticipantUser: payment.addUser
    };
};
//# sourceMappingURL=index.js.map