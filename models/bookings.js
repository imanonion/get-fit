const mongoose = require('mongoose');

//create a Schema
const bookingSchema = new mongoose.Schema ({
    user_email: { type: String, required: true },
    class_id: { type: String, required: true },
    organiser_email: { type: String, required: true }
}, { timestamps: true });

//create the model
const BookingModel = mongoose.model('Booking', bookingSchema);

//export the model
module.exports = {
    BookingModel: BookingModel
}

