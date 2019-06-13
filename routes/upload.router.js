const router = require('express').Router();
const jwt = require('../config/jwt.config');
const multer = require('multer');

const storage =   multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
        let filename = file.originalname; 
        callback(null, filename);
    }
});

// Multer function
var upload = multer({
    storage : storage
}).single('resume');

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        if(err){
            res.json({ success : false, message : err.message, data : null });
        }
        else {
            res.json({ success : true, message : 'Resume uploaded.', data : { filename : req.file.filename } });
        }   
    });
});

module.exports = router;