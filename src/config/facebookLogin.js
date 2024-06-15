require('dotenv').config({path:'.env.example'})
var FacebookStrategy = require('passport-facebook').Strategy;
var passport = require('passport');
const Users = require('../model/usersTable')

// Passport session setup. 
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
    done(null, obj);
});
passport.use(new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
    },
    // facebook return token
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(async () => {
            try {
                Users.findOne({ where: { email: profile.id } })
                    .then(user => {
                        if (user) {
                            done(null, user);
                        } else {
                            Users.create({
                                user_name: profile.displayName || 'none' ,
                                email: profile.id,
                                password: profile.id
                            })
                                .then(user => {
                                    done(null, user);
                                })
                                .catch(err => {
                                    console.error('Error creating user:', err);
                                    done(err);
                                });

                        }
                    })


            } catch (error) {
                done(error);
            }
        });
    }

))

module.exports = passport
