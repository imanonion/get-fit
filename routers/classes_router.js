// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classes_controller');
const {
    authenticatedOnly: authenticatedOnlyMiddleware,
    guestOnly: guestOnlyMiddleware
} = require('../middlewares/auth-middleware')

// =======================================
//              ROUTES
// =======================================
//index route
router.get('/', classController.index);

// new route
router.get('/new', authenticatedOnlyMiddleware, classController.new);

//create route
router.post('/', authenticatedOnlyMiddleware, classController.create);

//show route
router.get('/:slug/:id', classController.show);

//edit route
router.get('/:slug/:id/edit', authenticatedOnlyMiddleware, classController.edit);

//update route
router.patch('/:slug/:id', authenticatedOnlyMiddleware, classController.update);

//delete route
router.delete('/:slug/:id', authenticatedOnlyMiddleware, classController.delete);

//export
module.exports = router