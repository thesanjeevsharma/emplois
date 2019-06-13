const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
    providerID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'eProvider'
    },
    title : {
        type : String,
        required : [true, 'Job title cannot be blank.']
    },
    salary : {
        min : {
            type : Number,
            required : [true, 'Minimum salary is required.'],
            min : 1000
        },
        max : {
            type : Number,
            required : [true, 'Maximum salary is required.'],
            max : 999999
        }
    },
    skills : [{
        type : String,
        required : true
    }],
    description : {
        type : String,
        required : [true, 'Job description cannot be blank.']
    },
    applicants : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'eSeeker'
    }]
}, {
    timestamps : true
});

module.exports = mongoose.model('eJob', JobSchema);