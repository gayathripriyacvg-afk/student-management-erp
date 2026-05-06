const express = require('express');
const router = express.Router();
const marksController = require('../controllers/marksController');

router.get('/:studentId', marksController.getMarksByStudent);
router.post('/', marksController.addMarks);
router.put('/:id', marksController.updateMarks);
router.delete('/:id', marksController.deleteMarks);

module.exports = router;
