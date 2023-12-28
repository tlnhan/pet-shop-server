const Product = require('../models/product');

exports.getAllProduct = async (req, res) => {
    try {
        const allProduct = await Product.find();
        res.status(201).json({ allProduct });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.getProductByCategory = async (req, res) => {
    try {
        const products = await Product.find({ category: req.params.category });
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.getProductByID = async (req, res) => {
    try {
        const products = await Product.findById(req.params.id);
        res.status(200).json({ products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        res.status(200).json({ product, message: 'Update success' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(201).json(`Product id ${req.params.id} has been deleted!!`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { productName, price, category, image } = req.body;

        const newProduct = new Product({ productName, price, category, image });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
