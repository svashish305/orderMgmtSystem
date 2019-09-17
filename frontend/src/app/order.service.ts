import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  addOrder(number, due_date, customer_buyer_name, customer_address, customer_phone, order_total) {
    const order = {
      number: number,
      due_date: due_date,
      customer_buyer_name: customer_buyer_name,
      customer_address: customer_address,
      customer_phone: customer_phone,
      order_total: order_total
    };
    return this.http.post(`${this.uri}/orders/add`, order);
  }

  getOrders() {
    return this.http.get(`${this.uri}/orders`);
  }

  getOrderById(id) {
    return this.http.get(`${this.uri}/orders/${id}`);
  }

  updateOrder(id, number, due_date, customer_buyer_name, customer_address, customer_phone, order_total) {
    const order = {
      number: number,
      due_date: due_date,
      customer_buyer_name: customer_buyer_name,
      customer_address: customer_address,
      customer_phone: customer_phone,
      order_total: order_total
    };
    return this.http.post(`${this.uri}/orders/update/${id}`, order);
  }

  deleteOrder(id) {
    return this.http.get(`${this.uri}/orders/delete/${id}`);
  }
}
