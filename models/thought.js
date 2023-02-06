const mongoose = require('mongoose');
const moment = require('moment');

const thoughtSchema = new mongoose.Schema({
    thoughtText: {
        type: String,
        required: true,
        match: /^.{1,280}$/,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: newDate => moment(newDate).format('MMM DD, YYYY'),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [ReactionSchema],
},
{
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false,
});

    thoughtSchema.virtual('reactionCount').get(function () {
        return this.reactions.length;
});

const Thoughts = mongoose.model('Thought', thoughtSchema);
module.exports = Thoughts;

