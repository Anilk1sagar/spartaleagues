import Router from 'express';
import passport from 'passport';
import verifyUser from './../middleware/verifyUser';
import errorHandler from './../middleware/errorHandler';

//Routes Path
import User from './user';
import Upload from './upload';
import SendEmail from './sendEmail';
import Payment from './payment';

export default (app) => {
    
    let routes = Router();

    let findUser = verifyUser().verifyUser;


    /* User Routes */
    const user = User(app);
    routes.post('/user/register', user.register);
    routes.post('/user/authenticate', user.authenticate);
    routes.put('/user/update-password', user.update_password);
    routes.get('/user/profile', passport.authenticate('jwt', {session: false}), user.profile);
    routes.get('/user/id/:username', user.publicUserProfile);
    routes.put('/user/update/:id', user.updateUser);
    routes.post('/user/search-users', user.searchUsers);
    routes.get('/user/getParticipantUser/:email', passport.authenticate('jwt', {session: false}), user.getParticipantUser);
    routes.get('/team/getAllTeams', user.getTeams);


    /* Uploads/Posts Routes */
    const upload = Upload(app);
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
    const sendEmail = SendEmail(app);
    routes.post('/send/contact', sendEmail.contact);
    routes.post('/send/reset-password', sendEmail.resetPassword);
    routes.post('/send/send-team-invite', sendEmail.sendTeamInvite);
    routes.post('/send/payment-invoice', sendEmail.paymentInvoice);


    /* Payments Routes */
    const payment = Payment(app);
    routes.post('/payments/createHash', payment.createHash);
    routes.post('/payments/paymentStatus', payment.paymentStatus);
    routes.post('/payments/check-team-name', payment.checkTeamName);
    routes.post('/payments/addUser', payment.addParticipantUser);



    // Error Handler
    routes.use(errorHandler);

    return routes;
}