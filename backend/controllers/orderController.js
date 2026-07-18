const Order = require('../models/Order');

const addOrderItems = async (req,res) => {
    try{
        const{
           orderItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            userId 
        } = req.body;
        
        if (orderItems && orderItems.length === 0){
            return res.status(400).json({message: 'No order items'});

        }else{
            const order = new Order ({
                user: userId,
                orderItems,
                shippingAddress,
                paymentMethod,
                totalPrice
            });
            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }

    }catch(err){
        res.status(500).json({message: err.message});
    }
};

const getMyOrders = async (req,res) => {
   try {
     const orders = await Order.find({ user: req.params.userId});
     res.json(orders);

   }catch(err){
    res.status(500).json ({message: err.message});
   }
};

module.exports = {
    addOrderItems,
    getMyOrders
};