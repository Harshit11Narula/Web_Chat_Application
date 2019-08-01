'use strict';

module.exports = function (_, passport, Uservalidate) {
    return {
        SetRouting: function (router) {
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);

            router.post('/', Uservalidate.LoginValidation, this.postLogin);
            router.post('/signup', Uservalidate.SignupValidation, this.postSignUp);
            
        },



        indexPage: function (req, res) {
            const error = req.flash('error');
            return res.render('index', { title: 'Web_Chat_Application | Login', messages: error, hasError: error.length > 0 });

        },

        getSignUp: function (req, res) {
            const error = req.flash('error');
            return res.render('signup', { title: 'Web_Chat_Application | SignUp', messages: error, hasError: error.length > 0 });
        },
        postLogin: passport.authenticate('local.login', {
            successRedirect: '/home',
            failureRedirect: '/',
            failureFlash: true
        }),


        postSignUp: passport.authenticate('local.signup', {
            successRedirect: '/home',
            failureRedirect: '/signup',
            failureFlash: true
        }),

        homePage: function (req, res) {
            return res.render('home');
        },

       

    }
}