const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*

{
    content: 'Some paragraph in a story',
    type: 'paragraph'
}

{
    content: 'Some quote in a story',
    type: 'blockquote'
}

*/

// const StoryContentSchema = new Schema({
//     type: { type: String },
//     content: String
// });

const StorySchema = Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    content: {
        // type: [StoryContentSchema],
        type: [String],
    },
    author: {
        type: Schema.ObjectId,
        ref: 'User',
        required: [true, 'Author is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Story', StorySchema);
