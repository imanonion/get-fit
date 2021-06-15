const { response } = require('express');
const { ClassModel } = require('../models/classes');
const { UserModel } = require('../models/users');
const { BookingModel } = require('../models/bookings');
const _ = require('lodash');
const moment = require('moment');

module.exports = {

    index: async (req, res) => {
        let classes = []

        try {
            classes = await ClassModel.find()
            
            
            res.render('classes/index', {
                classes: classes,
                //to use moment() in index.ejs
                moment: moment 
            })
        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }
    },

    new: async (req, res) => {
        const messages = await req.consumeFlash('error')

        UserModel.findOne({ email: req.session.user.email })
            .then(item => {
                //if item is not found, redirect to homepage
                if (!item) {
                    res.redirect('/classes')
                    return
                }

                res.render('classes/new', {
                    messages: messages,
                    item: item
                })
            })
            .catch(err => {
                console.log(err)
                res.redirect('/classes')
            })

    },

    create: async (req, res) => {

        //if field is empty, then redirect to  new form again
        if (!req.body.nameOfClass) {
            await req.flash('error', 'Please fill in Name of Class')

            //predirect to new and pass  error message to frontend
            res.redirect('/classes/new')

            return
        }

        let slug = _.kebabCase(req.body.nameOfClass)
        let startDay = moment(req.body.startDateTime).format('ddd')
        let endDay = moment(req.body.endDateTime).format('ddd')

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
            startDateTime: req.body.startDateTime,
            startDay: startDay,
            endDateTime: req.body.endDateTime,
            endDay: endDay,
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

    show: async (req, res) => {

        //count no of bookings for this class
        try {
           countsOfClassBooked = await BookingModel.countDocuments({ class_id: req.params.id })
        } catch (err) {
            console.log(err)
            res.statusCode(500)
            return 'server error'
        }

        //retrieve class details
        try {
            let item = await ClassModel.findOne({ _id: req.params.id })
            let startDate = moment(item.startDateTime).format('ddd DD MMM YYYY')
            let startDay = moment(item.startDateTime).format('ddd')
            let startTime = moment(item.startDateTime).format('h:mm a')
            let endDate = moment(item.endDateTime).format('ddd DD MMM YYYY')
            let endDay = moment(item.endDateTime).format('ddd')
            let endTime = moment(item.endDateTime).format('h:mm a')

            res.render('classes/show', {
                item,
                countsOfClassBooked,
                startDate,
                startDay,
                startTime,
                endDate,
                endDay,
                endTime
            })

        } catch (err) {
            console.log(err)
            res.redirect('/classes')
            return
        }

    },

    edit: (req, res) => {
        ClassModel.findOne({ _id: req.params.id })
            .then(item => {
                res.render('classes/edit', {
                    item: item
                })
            })
            .catch(err => {
                console.log(err)
                res.redirect('/classes')
            })
    },

    update: (req, res) => {
        let updateSlug = _.kebabCase(req.body.nameOfClass)
        let startDay = moment(req.body.startDateTime).format('ddd')
        let endDay = moment(req.body.endDateTime).format('ddd')

        ClassModel.updateOne(
            { id: req.body._id },
            {
                $set: {
                    slug: updateSlug,
                    orgName: req.body.orgName,
                    email: req.body.email,
                    contact: req.body.contact,
                    nameOfClass: req.body.nameOfClass,
                    genreOfExercise: req.body.genreOfExercise,
                    noOfSessions: req.body.noOfSessions,
                    capacity: req.body.capacity,
                    price: req.body.price,
                    startDateTime: req.body.startDateTime,
                    startDay: startDay,
                    endDateTime: req.body.endDateTime,
                    endDay: endDay,
                    mode: req.body.mode,
                    location: req.body.location,
                    minAge: req.body.minAge,
                    maxAge: req.body.maxAge,
                    gender: req.body.gender,
                    details: req.body.details,
                    typeOfExercise: req.body.typeOfExercise,
                    image: req.body.image
                }
            }
        )
            .then(updateResp => {
                res.redirect('/classes/' + updateSlug + '/' + req.params.id)
            })
            .catch(err => {
                res.redirect('/classes/' + req.params.slug + '/' + req.params.id)
            })
    },

    delete: (req, res) => {
        ClassModel.deleteOne( { id: req.body._id })
            .then(deleteResp => {
                res.redirect('/classes')
            })
            .catch(err => {
                console.log(err)
                res.redirect('/classes')
            })
    }

}



