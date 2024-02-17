const express = require('express');
const cors = require('cors');

const authRoutes = require('./Routes/auth');
const adminRoutes = require('./Routes/admin');
const foodRoutes = require('./Routes/foods');
const orderRoutes = require('./Routes/order');
const cartRoutes = require('./Routes/cart');
const paymentRoutes = require('./Routes/payments')
const contactRoutes = require('./Routes/contact');
const globalErrorHandler = require('./controllers/error');

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
// app.use(express.json());
app.use(express.json({limit: '50mb'}))
app.use(express.static('public'));

app.use('/auth', authRoutes);

app.use('/admin', adminRoutes);

app.use('/foods', foodRoutes);

app.use('/order', orderRoutes);

app.use('/cart', cartRoutes);

app.use('/payments', paymentRoutes);

app.use('/contact', contactRoutes);

app.use(globalErrorHandler);

app.listen(PORT);