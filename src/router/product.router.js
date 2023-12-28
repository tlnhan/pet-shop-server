const express = require('express');

const { getAllProduct, getProductByCategory, updateProduct, deleteProduct, createProduct, getProductByID } = require('../controller/product.controller');

const { verifyTokenByAdmin } = require('../middleware/verifyToken');

const router = express.Router();

// ADMIN
router.post('/api/products/create', verifyTokenByAdmin, createProduct);

// ADMIN
router.get('/api/products/:id', verifyTokenByAdmin, getProductByID);

// ADMIN
router.post('/api/products/list', verifyTokenByAdmin, getAllProduct);

// ADMIN
router.patch('/api/products/update/:id', verifyTokenByAdmin, updateProduct);

// ADMIN
router.delete('/api/products/delete/:id', verifyTokenByAdmin, deleteProduct);

// USER
router.post('/api/products/:category', getProductByCategory);

// router.post('/users/logout', verifyToken, logout);

module.exports = router;
