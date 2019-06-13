const User = require('../models/user.model');
const Seeker = require('../models/seeker.model');
const Provider = require('../models/provider.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

// User Registration 
module.exports.register = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((doc) => {
            if (!doc) {
                if (_.isEmpty(req.body.username) || _.isEmpty(req.body.email) || _.isEmpty(req.body.password) || _.isEmpty(req.body.userType)) {
                    throw new Error('All values must be filled.');
                }
                // More checks to be used here
                const newUser = new User(req.body);
                return newUser.save()
            }
            else {
                throw new Error('User already exists.');
            }
        })
        .then((doc) => {
            let payload = {
                id: doc._id
            };
            let token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
            res.json({ success: true, message: 'Registration successful!', data: { token: token, username : doc.username, userType : doc.userType } });
        })
        .catch((err) => {
            console.log(err);
            res.json({ success: false, message: err.message, data: null });
        });
}

// User Login
module.exports.login = (req, res) => {
    User.findOne({ username : req.body.username })
        .then((doc) => {
            if (doc) {
                if (bcrypt.compareSync(req.body.password, doc.password)) {
                    let payload = {
                        id: doc._id
                    };
                    let token = jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
                    res.json({ success: true, message: 'Authentication successful!', data: { token: token, userType : doc.userType, username : doc.username } });
                }
                else {
                    throw new Error('Password incorrect.');
                }
            }
            else {
                throw new Error('No such user.');
            }
        })
        .catch((err) => {
            res.json({ success: false, message: err.message, data: null });
        });
}

// User Profile Completion 
module.exports.createProfile = (req, res) => {
    User.findOne({ _id: req.decoded.id })
        .then((doc) => {
            if (doc.userType === 'eProvider') {
                if (_.isEmpty(req.body.company) || _.isEmpty(req.body.employeeCount.toString()) || _.isEmpty(req.body.established.toString()) || _.isEmpty(req.body.location.city) || _.isEmpty(req.body.location.state) || _.isEmpty(req.body.location.country)) {
                    throw new Error('All values must be filled.');
                }
                // More checks here
                req.body.userID = doc._id;
                const newProvider = new Provider(req.body);
                return newProvider.save();
            }
            else if (doc.userType === 'eSeeker') {
                if (_.isEmpty(req.body.name.first) || _.isEmpty(req.body.name.last) || _.isEmpty(req.body.resume) || _.isEmpty(req.body.location.city) || _.isEmpty(req.body.location.state) || _.isEmpty(req.body.location.country) || _.isEmpty(req.body.skills)) {
                    throw new Error('All values must be filled.');
                }
                // More checks here
                req.body.userID = doc._id;
                const newSeeker = new Seeker(req.body);
                return newSeeker.save();
            }
            else {
                throw new Error('No such user type.');
            }
        })
        .then((doc) => {
            User.findOneAndUpdate({ _id: req.decoded.id }, { profileComplete: true }).then(() => { }).catch((err) => (console.log(err)));
            doc = Object.assign({}, doc.toJSON(), {'master' : true});
            res.json({ success: true, message: 'Profile saved.', data: doc });
        })
        .catch((err) => {
            res.json({ success: false, message: err.message, data: null });
        })
}

// Get Seeker Profile
module.exports.getSeekerProfile = (req, res) => {
    var user = {};
    User.findOne({ username: req.params.username }).lean()
        .then((doc) => {
            user = doc;
            if (!doc) {
                throw new Error('No such user.');
            }else if (!doc.profileComplete) {
                throw new Error(404);
            }
            else {
                return Seeker.findOne({ userID: doc._id }).lean();
            }
        })
        .then((doc) => {
            user = Object.assign({}, user, doc);
            if(req.decoded){
                if (doc.userID == req.decoded.id) {
                    user = Object.assign({}, user, { "master" : true });
                }
            }
            res.json({ success: true, message: 'Profile sent!', data: user });
        })
        .catch((err) => {
            res.json({ success: false, message: err.message, data: null });
        });
}

// Get Provider Profile
module.exports.getProviderProfile = (req, res) => {
    let user = {};
    console.log(req.params.username);
    User.findOne({ username: req.params.username }).lean()
        .then((doc) => {
            user = doc;
            if (!doc) {
                throw new Error('No such user.');
            }
            else if (!doc.profileComplete) {
                throw new Error(404);
            }
            else {
                return Provider.findOne({ userID: doc._id }).lean();
            }
        })
        .then((doc) => {
            user = Object.assign({}, user, doc);
            console.log(user);
            console.log(user.data);
            if (doc.userID == req.decoded.id) {
                user = Object.assign({}, user, { "master" : true });
            }
            res.json({ success: true, message: 'Profile sent!', data: user });
        })
        .catch((err) => {
            res.json({ success: false, message: err.message, data: null });
        });
}