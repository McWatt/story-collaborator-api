const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = Schema({
    fullName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        required: true,
    },
    hash_password: {
        type: String,
        required: true,
    },
    stories: [{
        type: Schema.ObjectId,
        ref: 'Story'
    }]
}, {
    timestamps: true
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password);
}

module.exports = mongoose.model('User', UserSchema);
