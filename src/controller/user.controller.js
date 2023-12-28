// const User = require('../models/user');

// exports.getAllUser = async (req, res) => {
//     try {
//         const allUser = await User.find();
//         res.status(201).json({ users: allUser });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// exports.getUserByID = async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id);
//         res.status(201).json({ users: user });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// exports.updateUser = async (req, res, next) => {
//     try {
//         const updateUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
//         res.status(200).json(updateUser);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// exports.deleteUser = async (req, res) => {
//     try {
//         await User.findByIdAndDelete(req.params.id);
//         res.status(201).json('User has been deleted!!');
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Server error' });
//     }
// };

// exports.getRole = async (req, res) => {
//     try {
//         const { user } = req;
//         const role = user.role;
//         res.status(200).json({ role });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ error: 'Server error' });
//     }
// };
