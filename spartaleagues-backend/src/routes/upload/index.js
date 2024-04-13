import CompetetionsRoutes from './competetions';
import FaqsRoutes from './faqs';
import PostsRoutes from './posts';

export default (app) => {

    let competetionsRoutes = CompetetionsRoutes(app);
    let faqsRoutes = FaqsRoutes(app);
    let postsRoutes = PostsRoutes(app);

    return {
        //competetion
        addCompetetions: competetionsRoutes.add,
        getCompetetions: competetionsRoutes.getCompetetions,
        //Faqs
        addFaqs: faqsRoutes.addFaqs,
        getFaqs: faqsRoutes.getFaqs,
        //Posts
        addPosts: postsRoutes.addPosts,
        getCsgoPosts: postsRoutes.getCsgoPosts,
        getBadmintonPosts: postsRoutes.getBadmintonPosts,
        getSinglePost: postsRoutes.getSinglePost
    }
}