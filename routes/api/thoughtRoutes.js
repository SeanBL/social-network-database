const router = require('express').Router();
const {
    getThoughts,
    createThoughts,
    updateThought,
    deleteThought,
    getSingleThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId')
.put(updateThought).delete(deleteThought).get(getSingleThought);

module.exports = router;