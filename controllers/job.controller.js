const Job = require('../models/job.model');
const Provider = require('../models/provider.model');
const Seeker = require('../models/seeker.model');
const _ = require('lodash');

// Create a new Job
module.exports.createJob = (req, res) => {
    Provider.findOne({ userID : req.decoded.id })
            .then((doc) => {
                if(!doc) {
                    throw new Error('No such user.');
                }
                else {
                    if(_.isEmpty(req.body.title) || _.isEmpty(req.body.salary.min.toString()) || _.isEmpty(req.body.salary.max.toString()) || _.isEmpty(req.body.description)) {
                        throw new Error('All values must be filled.');    
                    }
                    req.body.providerID = doc._id;
                    console.log(req.body);
                    const newJob = new Job(req.body);
                    return newJob.save()
                }
            })
            .then((doc) => {
                res.json({ success : true, message : 'Job created.', data : doc });
            })
            .catch((err) => {
                res.json({ success : true, message : err.message, data : null });
            });
}

// Get all Jobs
module.exports.getJobs = (req, res) => {
    Job.find({}).populate('providerID', 'company location')
        .then((doc) => {
            res.json({ success : true, message : 'Jobs fetched.', data : doc });
        })
        .catch((err) => {
            res.json({ success : false, message : err.message, data : null });
        })
}

// Get a specific Job
module.exports.getJob = (req, res) => {
    Job.findOne({ _id : req.params.JobID }).populate('providerID', '-_id').populate('applicants')
        .then((doc) => {
            if(!doc) {
                throw new Error('No such job.');
            }
            else {
                res.json({ success : true, message : 'Job fetched.', data : doc });                
            }
        })
        .catch((err) => {
            res.json({ success : true, message : err.message, data : null });
        });
}

// Get jobs by specific provider 
module.exports.getJobByProvider = (req, res) => {
    Job.find({ providerID : req.params.id }).populate('providerID')
        .then((doc) => {
            res.json({ success : true, message : 'Jobs fetched.', data : doc });
        })
        .catch((err) => {
            res.json({ success : false, message : err.message, data : null });
        });
}

// Apply for a  Job
module.exports.applyForJob = (req, res) => {
    let id;
    Seeker.findOne({ userID : req.decoded.id })
        .then((doc) => {
                id = doc._id;
                return Job.findOne({ _id : req.body.id, applicants : doc._id })
            })
        .then((doc) => {
            if(doc) {
                throw new Error("You've already applied!");
            }
            else {
                return Job.findOneAndUpdate({ _id : req.body.id }, { $push : { applicants : id }}, { new : true }) 
            }
        })
        .then((doc) => {
            res.json({ success : true, message : 'Applied!', data : doc });
        })
        .catch((err) => {
            res.json({ success : false, message : err.message, data : null });
        });
}

// Search for a Job
module.exports.searchJob = (req, res) => {
    console.log(req.body.query);
    let query = req.body.query;
    Job.find({ skills : { $regex : query, $options : 'i m' } }).populate('providerID', 'company location')
        .then((docs) => {
            res.json({ success : true, message : 'Search Results.', data : docs });
        })
        .catch((err) => {
            res.json({ success : false, message : err.message, data : null });
        })
}