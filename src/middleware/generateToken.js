const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};

exports.generateRefreshToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '365d' }
    );
};
