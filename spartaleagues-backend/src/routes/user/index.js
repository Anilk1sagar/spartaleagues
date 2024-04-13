import UserRoutes from './user';


export default (app) => {

    let userRoutes = UserRoutes(app);

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
}