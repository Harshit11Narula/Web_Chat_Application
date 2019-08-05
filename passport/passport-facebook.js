'use strict';

const passport = require('passport');
const User = require('../models/user');
const FacebookStrategy = require('passport-facebook').Strategy;
const secret = require('../secret/secretFile');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


passport.use(new FacebookStrategy({
    clientID: secret.facebook.clientID,                  // Fill up your facebok clientId and clientSecet
        clientSecret: secret.facebook.clientSecret,
        profileFields: ['email', 'displayName', 'photos'],
        callbackURL: 'http://localhost:3000/auth/facebook/callback',
        passReqToCallback: true

    },(req, token, refreshToken, profile, done) => {

        User.findOne({ facebook: profile.id }, (err, user) => {
            if (err)
                return done(err);
            if (user) {
                return done(null, user);
            } else {
                const newuser = new User();
                newuser.facebook = profile.id;
                newuser.fullname = profile.displayName;
                newuser.email = profile._json.email;
                newuser.userImage = 'http://graph.facebook.com/' + profile.id + '/picture?type=large';
                newuser.fbTokens.push({ token: token });

                newuser.save((err) => {
                    return done(null, user);
                });                                                                                              

            }
        });
    }));


