const jwt = require('jsonwebtoken');

// Main Auth Guard
module.exports.authenticate = (req, res, next) => {

    let token = req.headers['x-token-access'] || req.headers['authorization'];

    if(token) {
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) {
                return res.json({ success : false, message : err.message, data : null });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        return res.json({ success : false, message : 403, data : null });
    }

}

// Auth Guard for Profile
module.exports.profileAuthenticate = (req, res, next) => {

    let token = req.headers['x-token-access'] || req.headers['authorization'];

    if(token) {
        if(token.startsWith('Bearer ')) {
            token = token.slice(7, token.length);
        }

        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if(err) {
                return res.json({ success : false, message : err.message, data : null });
            }
            else {
                req.decoded = decoded;
                next();
            }
        });
    }
    else {
        next();
    }

}