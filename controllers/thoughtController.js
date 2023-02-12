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

    

    createThoughts(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.userId},
            {$addToSet: { thoughtText: req.body }},
            {new: true}
        )
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
};