const Order = require('../models/Order');

const addOrderItems = async (req, res) => {
    try {
        console.log("Incoming Data From Frontend:", req.body);
        
        // 1. Frontend එකෙන් එන නියම නම් ටික Destructure කරගන්නවා
        const {
            customerDetails,
            items,
            paymentMethod,
            totalAmount,
            userId // මේක Frontend එකෙන් ආවේ නැත්නම් undefined වෙයි
        } = req.body;
        
        if (items && items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        } else {
            // 2. ඔයාගේ Mongoose Order Schema එකට ගැලපෙන විදිහට Map කරලා object එක හදනවා
            const order = new Order({
                user: userId || null, // userId එක නැත්නම් null හෝ Mongoose Schema එකේ required නැත්නම් විතරක් දාන්න
                orderItems: items, // Frontend items එක Backend orderItems එකට දානවා
                shippingAddress: customerDetails, // customerDetails එක shippingAddress එකට දානවා
                paymentMethod,
                totalPrice: totalAmount // totalAmount එක totalPrice එකට දානවා
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (err) {
        console.error("Backend Error Detail:", err);
        res.status(500).json({ message: err.message });
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