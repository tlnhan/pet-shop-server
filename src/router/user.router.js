const express = require('express');

const { getUserByID, updateUser, deleteUser, getAllUser, getRole } = require('../controller/user.controller');

const { verifyToken, verifyTokenByAdmin, verifyTokenGetRole } = require('../middleware/verifyToken');

const { requestRefreshToken, createUser, login, logout } = require('../controller/auth.controller');

const router = express.Router();

router.post('/api/users/signup', createUser);
router.post('/api/users/login', login);

// router.get('/users/getalluser', verifyToken, getAllUser);
// router.get('/users/:id', getUserByID);

// router.put('/users/update/:id', updateUser);

// router.post('/users/logout', verifyToken, logout);

// Delete by Admin
// router.delete('/users/delete/:id', verifyTokenByAdmin, deleteUser);

// router.post('/refresh', requestRefreshToken);

module.exports = router;
