const Order = require('../models/Order');

const addOrderItems = async (req, res) => {
    try {
        console.log("Incoming Data From Frontend:", req.body);
        
        const {
            customerDetails,
            items,
            paymentMethod,
            totalAmount,
            userId
        } = req.body;
        
        if (items && items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        } else {
            const mappedOrderItems = items.map(item => ({
                name: item.name,
                qty: item.qty,
                price: item.price,
                image: item.image || '/images/default.jpg', 
                product: item.productId 
            }));

            const mappedShippingAddress = {
                address: customerDetails.address,
                city: customerDetails.city,
                postalCode: customerDetails.postalCode || '81000', 
                country: customerDetails.country || 'Sri Lanka'     
            };

            const order = new Order({
                user: userId || null, 
                orderItems: mappedOrderItems, 
                shippingAddress: mappedShippingAddress, 
                paymentMethod,
                totalPrice: totalAmount
            });

            const createdOrder = await order.save();
            res.status(201).json(createdOrder);
        }
    } catch (err) {
        console.error("Backend Error Detail:", err);
        res.status(500).json({ message: err.message });
    }
};

// ➔ මෙන්න මේ ෆන්ක්ෂන් එකයි කලින් හැලුණේ මචන්:
const getMyOrders = async (req, res) => {
   try {
     const orders = await Order.find({ user: req.params.userId });
     res.json(orders);
   } catch(err) {
     res.status(500).json({ message: err.message });
   }
};

module.exports = {
    addOrderItems,
    getMyOrders
};