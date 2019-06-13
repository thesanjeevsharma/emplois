const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true, 'Username cannot be blank!'],
        maxlength : 30,
        unique : true
    },
    email : {
        type : String,
        required : [true, 'Email cannot be blank'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'Password cannot be blank']
    },
    userType : {
        type : String,
        required : true,
        enum : ['eProvider', 'eSeeker'],
    },
    profileComplete : {
        type : Boolean,
        default : false
    }
    // ofModel : {
    //     type : String,
    //     required : true,
    //     enum : ['eProvider', 'eSeeker']
    // }
}, {
    timestamps : true
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10, (err, hash) => {
        if(!err) {
            this.password = hash;
            next();
        }
        else {
            console.log(err);
        }
    })
});

module.exports = mongoose.model('eUser', UserSchema);