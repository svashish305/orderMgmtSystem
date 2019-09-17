import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Order = new Schema({
  number: {
      type: String
  },
  due_date: {
      type: String 
  },
  customer_buyer_name: {
      type: String
  },
  customer_address: {
      type: String
  },
  customer_phone: {
      type: String,
  },
  order_total: {
    type: String
  }
});

export default mongoose.model('Order', Order);