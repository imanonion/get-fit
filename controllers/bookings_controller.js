const { response } = require('express');
const { ClassModel } = require('../models/classes');
const { UserModel } = require('../models/users');
const { BookingModel } = require('../models/bookings');
const _ = require('lodash');


module.exports = {

    // new: async (req, res) => {

    // },

    create: async (req, res) => {

        //if field is empty, then redirect to  new form again
        if (!req.body.nameOfClass) {
            await req.flash('error', 'Please fill in Name of Class')

            //predirect to new and pass  error message to frontend
            res.redirect('/classes/new')

            return
        }

        let  slug = _.kebabCase(req.body.nameOfClass)

        ClassModel.create({
            slug: slug,
            orgName: req.body.orgName,
            email: req.body.email,
            contact: req.body.contact,
            nameOfClass: req.body.nameOfClass,
            genreOfExercise: req.body.genreOfExercise,
            noOfSessions: req.body.noOfSessions,
            capacity: req.body.capacity,
            price: req.body.price,
            startDate: req.body.startDate,
            startTime: req.body.startTime,
            endTime: req.body.endTime,
            mode: req.body.mode,
            location: req.body.location,
            minAge: req.body.minAge,
            maxAge: req.body.maxAge,
            gender: req.body.gender,
            details: req.body.details,
            typeOfExercise: req.body.typeOfExercise,
            image: req.body.image
        })
            .then(createResp => {
                res.redirect('/classes')
            })
            .catch(err => {
                console.log(err)
                res.redirect('/classes/new')
            })
    },

}