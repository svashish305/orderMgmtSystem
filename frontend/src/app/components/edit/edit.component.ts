import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { OrderService } from '../../order.service';
import { Order } from '../../order.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  order: any = {};
  updateForm: FormGroup;

  constructor(private orderService: OrderService, private router: Router, private route: ActivatedRoute, 
    private snackBar: MatSnackBar, private fb: FormBuilder) {
      this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.orderService.getOrderById(this.id).subscribe(res => {
        this.order = res;
        this.updateForm.get('number').setValue(this.order.number);
        this.updateForm.get('due_date').setValue(this.order.dure_date);
        this.updateForm.get('customer_buyer_name').setValue(this.order.customer_buyer_name);
        this.updateForm.get('customer_address').setValue(this.order.customer_address);
        this.updateForm.get('customer_phone').setValue(this.order.customer_phone);
        this.updateForm.get('order_total').setValue(this.order.order_total);
      });

      this.orderService.getOrderById(this.id).subscribe(res => {
        this.order = res;
        this.updateForm.get('number').setValue(this.order.number);
        this.updateForm.get('due_date').setValue(this.order.dure_date);
        this.updateForm.get('customer_buyer_name').setValue(this.order.customer_buyer_name);
        this.updateForm.get('customer_address').setValue(this.order.customer_address);
        this.updateForm.get('customer_phone').setValue(this.order.customer_phone);
        this.updateForm.get('order_total').setValue(this.order.order_total);
      });
    });
  }

  createForm() {
    this.updateForm = this.fb.group({
      number: ['', Validators.required ],
      due_date: '',
      customer_buyer_name: '',
      customer_address: '',
      customer_phone: '',
      order_total: ''
    });
  }

  updateOrder(number, due_date, customer_buyer_name, customer_address, customer_phone, order_total) {
    this.orderService.updateOrder(this.id, number, due_date, customer_buyer_name, customer_address, customer_phone, order_total).subscribe(() => {
      this.snackBar.open('Order updated successfully', 'OK', {
        duration: 3000,
      });
    });
  }

}
