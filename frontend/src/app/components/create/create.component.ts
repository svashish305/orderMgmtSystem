import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { OrderService } from '../../order.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  
  constructor(private orderService: OrderService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      number: ['', Validators.required],
      due_date: '',
      customer_buyer_name: '',
      customer_address: '',
      customer_phone: '',
      order_total: ''
    });
  }

  addOrder(number, due_date, customer_buyer_name, customer_address, customer_phone, order_total) {
    this.orderService.addOrder(number, due_date, customer_buyer_name, customer_address, customer_phone, order_total).subscribe(() => {
      this.router.navigate(['/list']);
    });
  }

  ngOnInit() {
  }

}
