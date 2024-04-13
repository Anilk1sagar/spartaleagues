import SendRoutes from './send';

export default (app) => {

    let sendRoutes = SendRoutes(app);

    return {
        contact: sendRoutes.contact,
        resetPassword: sendRoutes.resetPassword,
        sendTeamInvite: sendRoutes.sendTeamInvite,
        paymentInvoice: sendRoutes.paymentInvoice,
    };
}