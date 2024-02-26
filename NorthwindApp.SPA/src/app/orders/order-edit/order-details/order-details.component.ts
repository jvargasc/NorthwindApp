import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderDetail } from 'src/app/_models/orderdetail';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  @Input() orderDetail = {} as OrderDetail;
  @Output() removeDetailButtonWasClicked = new EventEmitter<string>();
  orderDetailForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.orderDetailForm = new FormGroup({
      'productId' : new FormControl(this.orderDetail.productId, Validators.required),
      'unitPrice' : new FormControl(this.orderDetail.unitPrice, Validators.required),
      'quantity' : new FormControl(this.orderDetail.quantity, Validators.required),
      'discount' : new FormControl(this.orderDetail.discount, Validators.required),
    });
  }

  removeDetail() {
    this.removeDetailButtonWasClicked.emit('');
    //this.toolbarButtonWasClicked.emit(elementId);
  }

}
