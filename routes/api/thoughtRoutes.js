const router = require('express').Router();
const {
    getThoughts,
    createThoughts,
    updateThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThoughts);

router.route('/:thoughtId')
.put(updateThought);

module.exports = router;