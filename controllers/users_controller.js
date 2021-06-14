const { UserModel } = require('../models/users')
const { ClassModel } = require('../models/classes')
const { BookingModel } = require('../models/bookings')
const moment = require('moment')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {

    registerForm: (req, res) => {
        res.render('users/register')
    },

    loginForm: (req, res) => {

        //middleware will check if logged in or not. if logged in, bring to dashboard

        //if not logged in, then bring to login page
        res.render('users/login')
    },

    registerUser: async (req, res) => {

        //validate username
        if(!req.body.username) {
            res.redirect('/users/register')
            return
        }

        //ensure password and confirm password matches
        if(req.body.password !== req.body.password_confirm) {
            res.redirect('/users/register')
            return
        }

        //ensure no duplicate existing email in database
        let user = null
        try {
            user = await UserModel.findOne( { email: req.body.email })
        } catch (err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }
        if(user) { //if user already exists, then route back to register page
            res.redirect('/users/register')
            return
        }

        const timestampNow = moment().utc()

        //hashing using bcrypt
        const generatedHash = await bcrypt.hash(req.body.password, saltRounds)

        //create new user account
        try {
            await UserModel.create({
                username: req.body.username,
                email: req.body.email,
                hash: generatedHash,
                created_at: timestampNow,
                updated_at: timestampNow
            })
        } catch (err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }

        res.redirect('/classes')

    },

    loginUser: async (req, res) => {
        let user = null

        try {
            user = await UserModel.findOne({ email: req.body.email })
        } catch (err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }

        if(!user) { //if user doesn't exist, redirect to register page
            res.redirect('/users/register')
            return
        }

        //compare password to existing password
        const isValidPassword = await bcrypt.compare(req.body.password, user.hash)
        if(!isValidPassword) {
            res.redirect('/users/register')
            return
        }

        req.session.user = user
        res.redirect('/users/dashboard')
    },

    dashboard: async (req, res) => {

        //if user is logged in, middleware will bring them to dashboard here
        
        let organisedClasses = []
        let bookedClassesID = []
        let bookedClasses = []
        let userProfile = {}

        //get classes organised by user's email address
        try {
            organisedClasses = await ClassModel.find({ email: req.session.user.email })
        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }

        //get classes booked by user
        try {
            bookedClassesID =  await BookingModel.find({ user_email: req.session.user.email })
        } catch (err) {
            console.log(err)
            res.statusCode(500)
            return 'server error'
        }

        try {
            for (const eachClass of bookedClassesID) {
               let bookedClass = await ClassModel.findOne({ _id: eachClass.class_id })
               bookedClasses.push(bookedClass)
            }
        } catch (err) {
            console.log(err) 
            res.statusCode(500)
            return 'server error'
        }

        //get username to display in dashboard
        try {
            userProfile = await UserModel.findOne({ email: req.session.user.email })
        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }
                
        res.render('users/dashboard', {
            organisedClasses: organisedClasses,
            bookedClasses: bookedClasses,
            userProfile: userProfile
        })

    },

    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/classes')
    }

}