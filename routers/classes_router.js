// =======================================
//              DEPENDENCIES
// =======================================
const express = require('express');
const router = express.Router();
const classController = require('../controllers/classes_controller');
const bookingController = require('../controllers/bookings_controller');
const {
    authenticatedOnly: authenticatedOnlyMiddleware,
    guestOnly: guestOnlyMiddleware
} = require('../middlewares/auth-middleware')

// =======================================
//              ROUTES
// =======================================
//index route
router.get('/', classController.index);

//search post route
router.post('/search', classController.searchQuery);

//search get route
router.get('/search', classController.searchIndex);

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

//post booking when "Book Now" button in show.ejs is pressed
router.post('/:slug/:id/booking', authenticatedOnlyMiddleware, bookingController.bookClass)

//export
module.exports = router