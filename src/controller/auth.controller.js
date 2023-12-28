const jwt = require('jsonwebtoken');

const User = require('../models/user');

const bcrypt = require('bcrypt');

// let refreshTokens = [];

const { generateRefreshToken, generateToken } = require('../middleware/generateToken');

exports.createUser = async (req, res) => {
    try {
        const { username, password, email, phone, repeatPassword } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const existUser = await User.findOne({ username });

        if (existUser) {
            res.status(400).json({ error: 'Username already exists' });
            return;
        }

        if (password !== repeatPassword) {
            return res.status(400).json({ error: 'Password not match' });
        }

        const newUser = new User({ username, password: hash, email, phone });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json('wrong username');
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(404).json('wrong password');
        }
        if (user && validPassword) {
            const accessToken = generateToken(user);

            // refreshTokens.push(refreshToken);

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                secure: false,
                path: '/*',
                sameSite: 'strict'
            });

            const { password, ...other } = user._doc;
            res.status(201).json({
                message: 'Login success',
                other,
                accessToken
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// exports.requestRefreshToken = async (req, res) => {
//     //Take refresh token from user
//     const refreshToken = req.cookies.refreshToken;
//     //Send error if token is not valid
//     if (!refreshToken) return res.status(401).json("You're not authenticated");

//     // Nếu đã tạo Refresh token mà trong DB không có thì báo lỗi
//     if (!refreshTokens.includes(refreshToken)) {
//         return res.status(403).json('Refresh token is not found');
//     }
//     jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
//         if (err) {
//             console.log(err);
//         }

//         // Loại bỏ refreshToken hiện tại ra khỏi mảng
//         refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

//         const newAccessToken = generateToken(user);

//         const newRefreshToken = generateRefreshToken(user);

//         refreshTokens.push(newRefreshToken);

//         res.cookie('refreshToken', refreshToken, {
//             httpOnly: true,
//             secure: false,
//             path: '/',
//             sameSite: 'strict'
//         });
//         res.status(200).json({ accessToken: newAccessToken });
//     });
// };

exports.logout = (req, res) => {
    try {
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
};
