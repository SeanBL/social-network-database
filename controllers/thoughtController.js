const { User, Thought } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then(async (thoughts) => {
            const thoughtObj = {
                thoughts,
            };
            return res.json(thoughtObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    createThoughts: async(req, res) => {
        let newThought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username
        })
        let newThoughtId = newThought._id;
        User.findOneAndUpdate(
            { username: req.body.username},
            {$push: { thoughts: newThoughtId }},
            {new: true}
        )
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { new: true }
        )
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: "No thought with that ID"});
            }
            res.json({thought});
        })
        .catch((err) => res.status(500).json(err));
    }
};