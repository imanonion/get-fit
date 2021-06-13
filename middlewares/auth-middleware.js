module.exports = {

    authenticatedOnly: (req, res, next) => {
        //if session is valid, go to the next stage in controller
        if(req.session && req.session.user) {
            next()
            return
        }

        //if session if not available, redirect to login page
        res.redirect('/users/login')
    },

    guestOnly: (req, res, next) => {
        //if not logged in, go to the next stage in controller
        if(!req.session || !req.session.user) {
            next()
            return
        }

        //if logged in already, redirect to dashboard
        res.redirect('/users/dashboard')
    },

    setUserVarMiddleware: (req, res, next) => {
        res.locals.user = null

        if(req.session && req.session.user) {
            res.locals.user = req.session.user
        }

        next()
    }

}