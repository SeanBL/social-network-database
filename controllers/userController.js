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
};

