const mongoose = require('mongoose');

const SeekerSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true, 'userID cannot be blank.']
    },
    name : {
        first : {
            type : String,
            required : [true, 'First name cannot be blank.']
        },
        last : {
            type : String,
            required : [true, 'Last name cannot be blank.']
        }
    },
    resume : {
        type : String,
        required : [true, 'File name cannot be blank.']
    },
    location : {
        city : {
            type : String,
            required : [true, 'City name cannot be blank.']
        },
        state : {
            type : String,
            required : [true, 'State name cannot be blank.']
        },
        country : {
            type : String,
            required : [true, 'Country name cannot be blank.']
        }
    },
    skills : [{
        type : String,
        required : [true, 'Atleast one skill is required.']
    }]
});

module.exports = mongoose.model('eSeeker', SeekerSchema);