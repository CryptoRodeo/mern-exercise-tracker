const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, //all spaces will be trimmed off.
        minlength: 3
    },
},
{
    timestamps: true, //automatically create fields for when it was created / modified
});

const User = mongoose.model('User',userSchema);

module.exports = User;