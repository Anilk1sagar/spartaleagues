'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _verifyUser = require('./../middleware/verifyUser');

var _verifyUser2 = _interopRequireDefault(_verifyUser);

var _errorHandler = require('./../middleware/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _upload = require('./upload');

var _upload2 = _interopRequireDefault(_upload);

var _sendEmail = require('./sendEmail');

var _sendEmail2 = _interopRequireDefault(_sendEmail);

var _payment = require('./payment');

var _payment2 = _interopRequireDefault(_payment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//Routes Path
exports.default = app => {

    let routes = (0, _express2.default)();

    let findUser = (0, _verifyUser2.default)().verifyUser;

    /* User Routes */
    const user = (0, _user2.default)(app);
    routes.post('/user/register', user.register);
    routes.post('/user/authenticate', user.authenticate);
    routes.put('/user/update-password', user.update_password);
    routes.get('/user/profile', _passport2.default.authenticate('jwt', { session: false }), user.profile);
    routes.get('/user/id/:username', user.publicUserProfile);
    routes.put('/user/update/:id', user.updateUser);
    routes.post('/user/search-users', user.searchUsers);
    routes.get('/user/getParticipantUser/:email', _passport2.default.authenticate('jwt', { session: false }), user.getParticipantUser);
    routes.get('/team/getAllTeams', user.getTeams);

    /* Uploads/Posts Routes */
    const upload = (0, _upload2.default)(app);
    //Competetion
    routes.post('/events/add', upload.addCompetetions);
    routes.get('/events/getEvents', upload.getCompetetions);
    //Faqs
    routes.post('/faqs/add', upload.addFaqs);
    routes.get('/faqs/getFaqs', upload.getFaqs);
    //Posts
    routes.post('/posts/add', upload.addPosts);
    routes.get('/posts/csgo/:offset', upload.getCsgoPosts);
    routes.get('/posts/badminton/:offset', upload.getBadmintonPosts);
    routes.get('/posts/post/:heading', upload.getSinglePost);

    /* Send Routes */
    const sendEmail = (0, _sendEmail2.default)(app);
    routes.post('/send/contact', sendEmail.contact);
    routes.post('/send/reset-password', sendEmail.resetPassword);
    routes.post('/send/send-team-invite', sendEmail.sendTeamInvite);
    routes.post('/send/payment-invoice', sendEmail.paymentInvoice);

    /* Payments Routes */
    const payment = (0, _payment2.default)(app);
    routes.post('/payments/createHash', payment.createHash);
    routes.post('/payments/paymentStatus', payment.paymentStatus);
    routes.post('/payments/check-team-name', payment.checkTeamName);
    routes.post('/payments/addUser', payment.addParticipantUser);

    // Error Handler
    routes.use(_errorHandler2.default);

    return routes;
};
//# sourceMappingURL=index.js.map