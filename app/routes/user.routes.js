module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    app.route("/api/v1/auth/sign_in")
        .post(user.signIn);

    app.route("/api/v1/users")
        .post(user.register)
        .get(user.loginRequired, user.findAll);

    app.route('/api/v1/users/:userId')
        .post(user.loginRequired, user.findOne)
        .put(user.loginRequired, user.update)
        .delete(user.loginRequired, user.delete);
}
