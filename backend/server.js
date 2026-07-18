const express = require('express');
const dotenv = require ('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes  = require('./routes/orderRoutes');
dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req,res) =>  {
    res.send("E-commerce API is working mchan");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

