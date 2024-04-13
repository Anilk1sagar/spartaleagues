import PaymentRoutes from './payments';

export default (app) => {

    let payment = PaymentRoutes(app);

    return {
        createHash: payment.createHash,
        paymentStatus: payment.paymentStatus,
        checkTeamName: payment.checkTeamName,
        addParticipantUser: payment.addUser,
    }
}