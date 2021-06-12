// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classes_controller');

// =======================================
//              ROUTES
// =======================================
//index route
router.get('/', classController.index);

// new route
router.get('/new', classController.new);

//create route
router.post('/', classController.create);

//show route
router.get('/:slug/:id', classController.show);

//edit route
router.get('/:slug/:id/edit', classController.edit);

//update route
router.patch('/:slug/:id', classController.update);

//delete route
router.delete('/:slug/:id', classController.delete);

//export
module.exports = router