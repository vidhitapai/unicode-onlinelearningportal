const jwt = require('jsonwebtoken');
const User = require('../models/users');
const dotenv = require('dotenv').config();

const auth = {
    JWTauth: async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
            if(!user) {
                throw new Error();
            }
    
            // req.user = user;
            // req.token = token;
            
            next();
        }
        catch (err) {
            res.status(401).send({ "error": "Please authenticate!"});
        }
    },

    checkUserType: async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });
            if (user.userType == "STUDENT") {
                res.status(401).json({
                    message: "Not authenticated to perform action"
                });
            }
    
            if (user.userType == "INSTRUCTOR") {
                next();
            }
        }
        catch (error) {
            res.status(401).json({
                message: error.message
            })
        }
    }
}

// const auth = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization').replace('Bearer ', '');
//         const decoded = jwt.verify(token, 'JWT_KEY');
//         const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

//         if(!user) {
//             throw new Error();
//         }

//         req.user = user;
//         req.token = token;
        
//         next();
//     }
//     catch (err) {
//         res.status(401).send({ "error": "Please authenticate!"});
//     }
// };

// const checkUserType = async (req, res, next) => {
//     try {
//         const verifiedUser = req.user;

//         if (verifiedUser.userType == "STUDENT") {
//             res.status(401).json({
//                 message: "Not authenticated to perform action"
//             });
//         }

//         if (verifiedUser.userType == "INSTRUCTOR") {
//             next();
//         }
//     }
//     catch (error) {
//         res.status(401).json({
//             message: error.message
//         })
//     }
// };

module.exports = auth;