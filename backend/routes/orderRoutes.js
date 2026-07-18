const express = require('express');
const router = express.Router();
const { addOrderItems, getMyOrders } = require('../controllers/orderController');

router.route('/').post(addOrderItems);

router.route('/myorders/:userId').get(getMyOrders);
router.get('/', async (req, res) => {
    try{
        const orders = await Order.find({}).populate('user', 'name email');
        res.json(orders);
    }catch(error){
        res.status(500).json({ message: 'Orders not yet', error: error.message});
    }
    
});

router.put('/:id/deliver', async (req,res) => {
    try{
        const order = await Order.findById(req.params.id);

        if(order){
            order.isDelivered = true;
            const updatedOrder = await order.save();
            res.json(updatedOrder);

        }else{
            res.status(404).json({ message: 'Order not found'});

        }
    }catch(error){
        res.status(500).json ({ message: 'Cant update', error: error.message});

    }
});







module.exports = router;
