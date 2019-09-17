const express = require("express");

const Order = require("../models/order");
const checkAuth = require("../middleware/check-auth");

const router = express.Router();

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

module.exports = router;
