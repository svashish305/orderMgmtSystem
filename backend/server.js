import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Order from './models/Order';

// const orderRoutes = require('./routes/order');
const userRoutes = require("./routes/user");

const app = express();
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/orders', { useNewUrlParser: true });

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});

router.route('/orders/add').post((req, res) => {
    let order = new Order(req.body);
    order.save()
        .then(order => {
            res.status(200).json({'order': 'Added successfully'});
        })
        .catch(err => {
            res.status(400).send('Failed to create new record');
        });
});

router.route('/orders').get((req, res) => {
    Order.find((err, orders) => {
        if (err)
            console.log(err);
        else
            res.json(orders);
    });
});

router.route('/orders/:id').get((req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (err)
            console.log(err);
        else
            res.json(order);
    })
});

router.route('/orders/update/:id').post((req, res) => {
    Order.findById(req.params.id, (err, order) => {
        if (!order)
            return next(new Error('Could not load Document'));
        else {
            order.number = req.body.number;
            order.due_date = req.body.due_date;
            order.customer_buyer_name = req.body.customer_buyer_name;
            order.customer_address = req.body.customer_address;
            order.customer_phone = req.body.customer_phone;
            order.order_total = req.body.order_total;

            order.save().then(order => {
                res.json('Update done');
            }).catch(err => {
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/orders/delete/:id').get((req, res) => {
    Order.findByIdAndRemove({_id: req.params.id}, (err, order) => {
        if (err)
            res.json(err);
        else
            res.json('Removed successfully');
    });
});

// app.use("/api/order", orderRoutes);
app.use("/api/user", userRoutes);

app.use('/api/order', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));