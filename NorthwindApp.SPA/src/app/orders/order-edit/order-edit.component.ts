import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Customer } from 'src/app/_models/customer';
import { Employee } from 'src/app/_models/employee';
import { Order } from 'src/app/_models/order';
import { Region } from 'src/app/_models/region';
import { Shipper } from 'src/app/_models/shipper';
import { CustomersService } from 'src/app/_services/customers.service';
import { EmployeesService } from 'src/app/_services/employees.service';
import { OrdersService } from 'src/app/_services/orders.service';
import { RegionsService } from 'src/app/_services/regions.service';
import { ShippersService } from 'src/app/_services/shippers.service';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  order: Order = {} as Order;
  orderForm: FormGroup = new FormGroup({});
  modalTitle: string = "modal Title!!";
  modalBody: string = "modal Body!!";
  customers: Customer[]  = [];
  employees: Employee[]  = [];
  regions: Region[]  = [];
  shippers: Shipper[]  = [];

  constructor(private ordersService: OrdersService, private customersService: CustomersService, private employeesService: EmployeesService, private regionsService: RegionsService, private shippersService: ShippersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.setParameters();
    this.initializeForm();
    this.setOrder();
  }

  toolbarButtonWasClicked(buttonName: string) {
    switch(buttonName){
      case "new":
        this.displayYesNoModal();
        break;
      case "save":
        console.log(buttonName);
        break;
      case "return":
        this.router.navigate(['/orders/order-list']);
        break;
    }
  }

    modalButtonWasClicked(button: string) {
    switch(button) {
      case "btnYes":
        const modalYesNo = document.getElementById("modalyesno");
        if(modalYesNo)
          modalYesNo.style.display = 'none';
        this.clearForm();
        break;
      case "btnNo":
        break;
    }
  }

  private displayYesNoModal() {
    const btnShowModal = document.getElementById("showModal");
    if(btnShowModal)
      btnShowModal.click();
  }

  private clearForm() {
    this.order = {} as Order;
    this.initializeForm();
    this.router.navigate(['/orders/order-edit']);
  }

  private setOrder() {
    const orderId = this.route.snapshot.paramMap.get('orderId');
    if(orderId)
      this.ordersService.getOrder(+orderId).subscribe(
      {
        next: orderResult => {
          this.order = orderResult;
          this.initializeForm();
        }
      }
      );
  }

  private initializeForm() {
    this.orderForm = new FormGroup({
      'orderId' : new FormControl(this.order.orderId),
      'customerId' : new FormControl(this.order.customerId),
      'employeeId' : new FormControl(this.order.employeeId),
      'orderDate' : new FormControl(this.order.orderDate),
      'requiredDate' : new FormControl(this.order.requiredDate),
      'shippedDate' : new FormControl(this.order.shippedDate),
      'shipperId' : new FormControl(this.order.shipperId),
      'freight' : new FormControl(this.order.freight),
      'shipName' : new FormControl(this.order.shipName),
      'shipAddress' : new FormControl(this.order.shipAddress),
      'shipCity' : new FormControl(this.order.shipCity),
      'regionId' : new FormControl(this.order.regionId),
      'shipPostalCode' : new FormControl(this.order.shipPostalCode),
      'shipCountry' : new FormControl(this.order.shipCountry)
    });

    this.orderForm.controls['orderId'].disable();
  }

  private setParameters() {
    this.setCustomers();
    this.setEmployees();
    this.setRegions();
    this.setShippers();
  }

  private setCustomers() {
    this.customersService.getCustomers().subscribe(
      {
        next: customersResult => {
          this.customers = customersResult;
        }
      }
    );
  }

  private setEmployees() {
    this.employeesService.getEmployees().subscribe(
      {
        next: employeesResult => {
          this.employees = employeesResult;
        }
      }
    );
  }

  private setRegions() {
    this.regionsService.getRegions().subscribe(
      {
        next: regionsResult => {
          this.regions = regionsResult;
        }
      }
    );
  }

  private setShippers() {
    this.shippersService.getShippers().subscribe(
      {
        next: shippersResult => {
          this.shippers = shippersResult;
        }
      }
    );
  }

}
