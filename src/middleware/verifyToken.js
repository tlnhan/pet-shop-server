const jwt = require('jsonwebtoken');
const { sendError } = require('../utils/helper');

exports.verifyToken = async (req, res, next) => {
    const jwtToken = req.headers?.authorization?.split(' ')[1];

    if (!jwtToken) {
        return res.status(401).json("You're unauthenticated");
    }

    try {
        const user = jwt.verify(jwtToken, process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(404).json('Invalid token!');
    }
};

// Use by ADMIN
exports.verifyTokenByAdmin = async (req, res, next) => {
    exports.verifyToken(req, res, () => {
        console.log(req.user);
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(401).json('You are not allowed');
        }
    });
};

// exports.verifyTokenGetRole = async (req, res, next) => {
//     exports.verifyToken(req, res, () => {
//         if (req.user.id == req.params.id) {
//             next();
//         } else {
//             return res.status(401).json('You are not allowed');
//         }
//     });
// };
