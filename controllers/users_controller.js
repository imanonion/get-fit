const { UserModel } = require('../models/users')
const moment = require('moment')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {

    registerForm: (req, res) => {
        res.render('/users/register')
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

    dashboard: (req, res) => {

        //if user is logged in, middleware will bring them to dashboard

        //if not logged in, bring user to login page
        res.redirect('/users/login')
    },

    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/classes')
    }

}