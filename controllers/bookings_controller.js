const { response } = require('express');
const { ClassModel } = require('../models/classes');
const { UserModel } = require('../models/users');
const { BookingModel } = require('../models/bookings');
const _ = require('lodash');
const moment = require('moment');


module.exports = {

    bookClass: async (req, res) => {
        let classInfo = []

        //get class_id from url and organiser_email
        try {
            classInfo = await ClassModel.findOne({ _id: req.params.id })
        } catch (err) {
            res.statusCode(500)
        }

        const timestampNow = moment()

        console.log(classInfo)
        //get organiser email address 
        let organiser_email = classInfo.email
        console.log(organiser_email)

        //create new booking
        try {
            await BookingModel.create({
                user_email: req.session.user.email,
                class_id: req.params.id,
                organiser_email: organiser_email,
                created_at: timestampNow,
                updated_at: timestampNow
            })
        } catch (err) {
            console.log(err)
            res.redirect('/classes/' + req.params.slug + '/' + req.params.id)
            return
        }

        res.redirect('/classes/' + req.params.slug + '/' + req.params.id)
            
    },

}