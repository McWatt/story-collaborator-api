module.exports = (app) => {
    const story = require('../controllers/story.controller.js');

    app.post('/api/v1/stories', story.create);

    app.get('/api/v1/stories', story.findAll);

    app.get('/api/v1/stories/:storyId', story.findOne);

    app.put('/api/v1/stories/:storyId', story.update);

    app.delete('/api/v1/stories/:storyId', story.delete);
}
