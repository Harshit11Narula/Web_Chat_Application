'use strict';

const passport = require('passport');
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const secret = require('../secret/secretFile');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


passport.use(new GoogleStrategy({
    clientID: secret.google.clientID,                // Fill up your google clientId and clientSecet
    clientSecret: secret.google.clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true

}, (req, accessToken, refreshToken, profile, done) => {

        User.findOne({ google: profile.id }, (err, user) => {
            console.log(profile);
            if (err)
                return done(err);

            if (user)
                return done(null, user);
            else {
                const newUser = new User();
                newUser.google = profile.id;
                newUser.fullname = profile.displayName;
                newUser.userImage = profile._json.picture;

                newUser.save((err) => {
                    if (err) return done(err);
                    return done(null, newUser);
                })

            }


    });
}));
/*
passport.use(new GoogleStrategy({

    clientID: secret.google.clientID,
    clientSecret: secret.google.clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true
},
    function (req, token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function () {

            // try to find the user based on their google id
            User.findOne({ 'google.id': profile.id }, function (err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var newUser = new User();
                    console.log(profile);
                    //JSON.parse(profile);
                    // set all of the relevant information
                    newUser.google.id = profile.id;
                  
                    newUser.google.name = profile.displayName;
                    newUser.google.uname = profile.emails[0].value; // pull the first email
                    newUser.google.dp = profile._json.picture;
                    console.log('url is');
                    console.log(newUser.google.name);
                    console.log(newUser.google.dp);
                    //console.log(profile.picture);
                    Download(newUser.google.uname, newUser.google.dp, function (err) {
                        if (err)
                            console.log('error in dp');
                        else
                            console.log('Profile Picture downloaded');
                    });

                    // save the user
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
        });

    }));
};

*/