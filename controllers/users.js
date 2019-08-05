'use strict';

module.exports = function (_, passport, Uservalidate) {
    return {
        SetRouting: function (router) {
            router.get('/', this.indexPage);
            router.get('/signup', this.getSignUp);
            router.get('/home', this.homePage);
            router.get('/auth/facebook', this.getFacebookLogin);
            router.get('/auth/facebook/callback',
                passport.authenticate('facebook', { failureRedirect: '/signup' }),
                function (req, res) {
                    res.redirect('/home');
                });

            router.get('/auth/google', this.getGoogleLogin);

            router.get('/auth/google/callback',
                passport.authenticate('google', { failureRedirect: '/signup' }),
                function (req, res) {
                    res.redirect('/home');
                });
  


            router.post('/signup', Uservalidate.SignupValidation, this.postSignUp);
            router.post('/', Uservalidate.LoginValidation, this.postLogin);
            
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

        getFacebookLogin: passport.authenticate('facebook', {
            session: false,
            scope: 'email',
        }),

        getGoogleLogin: passport.authenticate('google', {
            scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/plus.profile.emails.read']
        }),



        

        homePage: function (req, res) {
            return res.render('home');
        },

       

    }
}