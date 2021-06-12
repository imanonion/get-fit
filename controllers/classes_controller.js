const { response } = require('express');
const { ClassModel } = require('../models/classes');
const _ = require('lodash');


module.exports = {

    index: async (req, res) => {
        let classes = []

        try {
            classes = await ClassModel.find()
        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }

        res.render('classes/index', {
            classes: classes
        })
    },

    new: (req, res) => {
        
        res.render('classes/new')

    },

    create: async (req, res) => {

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

    show: (req, res) => {

        ClassModel.findOne({ _id: req.params.id })
            .then(item => {
                //if item is not found, redirect to homepage
                if (!item) {
                    res.redirect('/classes')
                    return
                }

                res.render('classes/show', {
                    item: item
                })
            })
            .catch(err => {
                console.log(err)
                res.redirect('/classes')
            })
    },

    edit: (req, res) => {
        ClassModel.findOne({ _id: req.params.id })
            .then(item => {
                res.render('classes/edit', {
                    item: item
                })
            })
            .catch(err => {
                console.log(error)
                res.redirect('/classes')
            })
    },

    update: (req, res) => {
        let updateSlug = _.kebabCase(req.body.nameOfClass)

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