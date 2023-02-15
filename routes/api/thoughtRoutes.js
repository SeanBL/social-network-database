const router = require('express').Router();
const {
    getThoughts,
    createThoughts,
    updateThought,
    deleteThought,
    getSingleThought,
    createReaction,
    deleteReaction,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId')
.put(updateThought).delete(deleteThought).get(getSingleThought);

router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;