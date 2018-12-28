module.exports = (app) => {
    const story = require('../controllers/story.controller.js');
    const user = require('../controllers/user.controller');

    app.route('/api/v1/stories')
        .get(user.loginRequired, story.findAll)
        .post(user.loginRequired, story.create);

    app.route("/api/v1/stories/:storyId")
        .get(user.loginRequired, story.findOne)
        .put(user.loginRequired, story.update)
        .delete(user.loginRequired, story.delete);
}
