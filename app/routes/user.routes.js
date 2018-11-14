module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    app.post('/api/v1/users', user.create);

    app.get('/api/v1/users', user.findAll);

    app.get('/api/v1/users/:userId', user.findOne);

    app.put('/api/v1/users/:userId', user.update);

    app.delete('/api/v1/users/:userId', user.delete);
}
