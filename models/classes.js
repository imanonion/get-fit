const { Decimal128 } = require('mongodb');
const mongoose = require('mongoose');

//create a Schema
const classSchema = new mongoose.Schema ({
    slug: {type: String, required: true },
    orgName: { type: String, required: true },
    email: { type: String, required: true },
    contact: { type: String, required: true },
    nameOfClass: { type: String, required: true },
    genreOfExercise: { type: String, required: true },
    noOfSessions: { type: Number, required: true },
    capacity: { type: Number, required: true },
    price: { type: Decimal128, required: true },
    startDateTime: { type: Date, required: true },
    startDay: { type: String, required: true },
    endDateTime: {type: Date, required: true },
    endDay: { type: String, required: true },
    mode: { type: String, required: true },
    location: { type: String, required: true },
    minAge: { type: String },
    maxAge: { type: String },
    gender: { type: String },
    details: { type: String },
    typeOfExercise: { type: String },
    image: { type: String }
}, { timestamps: true });

//create the model
const ClassModel = mongoose.model('Class', classSchema);

//export the model
module.exports = {
    ClassModel: ClassModel
};