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
            // 1. Frontend items ටික Backend Schema එකට ගැලපෙන්න හදාගන්නවා
            const mappedOrderItems = items.map(item => ({
                name: item.name,
                qty: item.qty,
                price: item.price,
                image: item.image || '/images/default.jpg', // Schema එකට image එකක් ඕන නිසා default එකක් දානවා
                product: item.productId // 👈 Schema එක ඉල්ලන 'product' එකට 'productId' එක දානවා
            }));

            // 2. Shipping Address එක Schema එක ඉල්ලන විදිහට හදාගන්නවා
            const mappedShippingAddress = {
                address: customerDetails.address,
                city: customerDetails.city,
                postalCode: customerDetails.postalCode || '81000', // 👈 Schema එකට postalCode ඕන නිසා default එකක්
                country: customerDetails.country || 'Sri Lanka'     // 👈 Schema එකට country ඕන නිසා default එකක්
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

module.exports = {
    addOrderItems,
    getMyOrders
};