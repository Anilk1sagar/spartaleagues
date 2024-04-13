'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _competetions = require('./competetions');

var _competetions2 = _interopRequireDefault(_competetions);

var _faqs = require('./faqs');

var _faqs2 = _interopRequireDefault(_faqs);

var _posts = require('./posts');

var _posts2 = _interopRequireDefault(_posts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = app => {

    let competetionsRoutes = (0, _competetions2.default)(app);
    let faqsRoutes = (0, _faqs2.default)(app);
    let postsRoutes = (0, _posts2.default)(app);

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
    };
};
//# sourceMappingURL=index.js.map