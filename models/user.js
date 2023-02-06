const mongoose = require('mongoose');

const validEmail = function(value) {
    return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
};

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        unique: true,
        required: true,
        trim: true,
     },
    email: {
        type: String,
        unique: true,
        required: [true, 'User email required'],
        validate: {
            validator: validEmail,
        },
        message: props => `${props.value} is not a valid email address!`
     },
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = mongoose.model('User', userSchema);
module.exports = User;