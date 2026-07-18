const Product = require ('../models/Product');

const getProducts = async (req,res) => {
    try{
        const products = await Product.find({})
        res.json(products);
    }catch(err){
        res.status(500).json({message: err.message});
    }
};

const createProduct = async(req,res)=> {
    try{
        const {name, description ,price , image, category , countInstock} = req.body;
        const product = new Product ({
            name,
            description,
            price,
            image,
            category,
            countInstock
        });
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            await product.deleteOne();
            res.json({ message: 'භාණ්ඩය සාර්ථකව අයින් කරා මචන්!' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


module.exports = {
    getProducts,
    createProduct,
    deleteProduct
};