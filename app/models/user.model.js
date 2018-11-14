const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: String,
    email: String,
    stories: [{
        type: Schema.ObjectId,
        ref: 'Story'
    }]
}, {
        timestamps: true
    });

module.exports = mongoose.model('User', UserSchema);
