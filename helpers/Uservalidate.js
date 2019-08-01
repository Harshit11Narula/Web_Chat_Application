'use strict';

module.exports = function () {
    return {
        SignupValidation: (req, res, next) => {
            req.checkBody('username', 'Username is Required').notEmpty();
            req.checkBody('username', 'Username must not be less than 5').isLength({ min: 5 });

            req.checkBody('email', 'email is Required').notEmpty();
            req.checkBody('email', 'email is Invalid').isEmail();

            req.checkBody('password', 'password is Required').notEmpty();
            req.checkBody('password', 'password must not be less than 5').isLength({ min: 5 });

            req.getValidationResult()
                .then((result) => {
                    const error = result.array();
                    const message = [];
                    error.forEach((error) => {
                        message.push(error.msg);

                    });
                    req.flash('error', message);
                    res.redirect('/signup');
                })
                .catch((err) => {
                    return next();
                })

        },

        LoginValidation: (req, res, next) => {
            req.checkBody('email', 'email is Required').notEmpty();
            req.checkBody('email', 'email is Invalid').isEmail();
            req.checkBody('password', 'password is Required').notEmpty();
            req.checkBody('password', 'password must not be less than 5').isLength({ min: 5 });

            req.getValidationResult()
                .then((result) => {
                    const error = result.array();
                    const message = [];
                    error.forEach((error) => {
                        message.push(error.msg);
                    });
                    req.flash('error', message);
                    res.redirect('/');
                })
                .catch((err) => {
                    return next();
                })

        }

    };
}



