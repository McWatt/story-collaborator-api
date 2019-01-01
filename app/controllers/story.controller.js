const Story = require('../models/story.model.js');

exports.create = (req, res) => {
	if (!req.body.title) {
		return res.status(400).send({
			message: 'Story title cannot be empty',
		});
	}
	if (!req.body.description) {
		return res.status(400).send({
			message: 'Story description cannot be empty',
		});
	}

	const story = new Story({
		title: req.body.title,
		content: req.body.content,
		author: req.body.author_id,
		description: req.body.description,
	});

	story
		.save()
		.then(data => {
			res.send(data);
		})
		.catch(err => {
			res.status(500).send({
				message:
					err.message ||
					'Some error occurred while creating the story.',
			});
		});
};

exports.findAll = (req, res) => {
	Story.find({ author: req.query.userId }).then(story => {
		if (!story) {
			return res.status(404).send({
				message: 'Stories not found for user ' + req.query.userId,
			});
		}
		res.send(story);
	});
};

exports.findOne = (req, res) => {
	Story.findById(req.params.storyId)
		.then(story => {
			if (!story) {
				return res.status(404).send({
					message: 'Story not found with id ' + req.params.storyId,
				});
			}
			res.send(story);
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Story not found with id ' + req.params.storyId,
				});
			}

			return res.status(500).send({
				message: 'Error retrieving story with id ' + req.params.storyId,
			});
		});
};

// Update a story identified by the storyId in the request
exports.update = (req, res) => {
	// Validate Request
	if (!req.body.description) {
		return res.status(400).send({
			message: 'Story description can not be empty',
		});
	}
	if (!req.body.title) {
		return res.status(400).send({
			message: 'Story title can not be empty',
		});
	}

	// Find story and update it with the request body
	Story.findByIdAndUpdate(
		req.params.storyId,
		{
			title: req.body.title || 'Untitled Story',
			content: req.body.content,
			description: req.body.description,
		},
		{ new: true },
	)
		.then(story => {
			if (!story) {
				return res.status(404).send({
					message: 'Story not found with id ' + req.params.storyId,
				});
			}
			res.send(story);
		})
		.catch(err => {
			if (err.kind === 'ObjectId') {
				return res.status(404).send({
					message: 'Story not found with id ' + req.params.storyId,
				});
			}
			return res.status(500).send({
				message: 'Error updating story with id ' + req.params.storyId,
			});
		});
};

// Delete a story with the specified storyId in the request
exports.delete = (req, res) => {
	Story.findByIdAndRemove(req.params.storyId)
		.then(story => {
			if (!story) {
				return res.status(404).send({
					message: 'Story not found with id ' + req.params.storyId,
				});
			}
			res.send({ message: 'Story deleted successfully!' });
		})
		.catch(err => {
			if (err.kind === 'ObjectId' || err.name === 'NotFound') {
				return res.status(404).send({
					message: 'Story not found with id ' + req.params.storyId,
				});
			}
			return res.status(500).send({
				message: 'Could not delete story with id ' + req.params.storyId,
			});
		});
};
