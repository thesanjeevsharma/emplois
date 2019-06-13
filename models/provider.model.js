const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true, 'userID cannot be blank']
    },
    company : {
        type : String,
        required : [true, 'Company name cannot be blank.']
    },
    employeeCount : {
        type : Number,
        required : [true, 'Employee count cannot be blank.'],
        max : 100000,
        min : 10
    },
    established : {
        type : Number,
        required : true,
        min : 1800,
        max : (new Date()).getFullYear()
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
    about : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('eProvider', ProviderSchema);