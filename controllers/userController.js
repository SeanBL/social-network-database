const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

const totalUser = async () =>
User.aggregate()
    .count('userCount')
    .then((numberOfUsers) => numberOfUsers); 

module.exports = {
    getUsers(req, res) {
        User.find()
        .then(async (users) => {
            const userObj = {
                users,
                totalUser: await totalUser(),
            };
            return res.json(userObj);
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select('-__v')
            .then(async (user) => {
                if(!user) {
                    res.status(404).json({ message: 'No user with that ID' })
                }
                res.json({user}) 
            })
            .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    updateUser(req, res) {
        User.findByIdAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        )
        .then((user) => {
            if(!user) {
                res.status(404).json({ message: "No user with that ID" })
            }
            res.json({user})
        })
        .catch((err) => res.status(500).json(err));
    },

};

