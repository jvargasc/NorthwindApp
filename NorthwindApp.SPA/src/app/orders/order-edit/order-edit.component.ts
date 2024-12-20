import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { Customer } from 'src/app/_models/customer';
import { Employee } from 'src/app/_models/employee';
import { ModalMessageData } from 'src/app/_models/modalmessagedata';
import { Order } from 'src/app/_models/order';
import { Region } from 'src/app/_models/region';
import { Shipper } from 'src/app/_models/shipper';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { CustomersService } from 'src/app/_services/customers.service';
import { EmployeesService } from 'src/app/_services/employees.service';
import { OrdersService } from 'src/app/_services/orders.service';
import { RegionsService } from 'src/app/_services/regions.service';
import { ShippersService } from 'src/app/_services/shippers.service';
import { ShowMessageComponent } from 'src/app/_shared/modals/show-message/show-message.component';

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css']
})
export class OrderEditComponent implements OnInit {
  order: Order = {} as Order;
  orderForm: FormGroup = new FormGroup({});
  customers: Customer[]  = [];
  employees: Employee[]  = [];
  regions: Region[]  = [];
  shippers: Shipper[]  = [];
  toolbarButtonPressed = "";
  bodyToast = "Record successfully saved!!!";
  savingRecord = false;

  modalRef: BsModalRef;

  constructor( private ordersService: OrdersService, private customersService: CustomersService, private employeesService: EmployeesService, private regionsService: RegionsService, private shippersService: ShippersService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private confirmService: ConfirmService, private modalService: BsModalService ) { }

  ngOnInit() {
    this.getParameters();
    this.initializeForm();
    this.onAddDetail();
    this.setOrder();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";

    switch(buttonName){
      case "new":
        modalBody = "Do you wish to clear this Order and create a new one?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Order?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "return":
        this.router.navigate(['/orders/order-list']);
        break;
    }
  }

  modalButtonWasClicked(button: string) {
    switch(button) {
      case "btnYes":
        if (this.toolbarButtonPressed == "new")
          this.clearForm();
        if (this.toolbarButtonPressed == "save") {
            if(this.requiredFieldsValid())
              this.createOrUpdateOrder();
            else
              this.savingRecord = false;
        }
        break;
      case "btnNo":
        break;
    }

    this.toolbarButtonPressed = ""
  }

  onAddDetail() {
    let orderDetails = (<FormArray>this.orderForm.get('details'));
    orderDetails.push(
      new FormGroup({
        orderId: new FormControl(this.order.orderId, Validators.required),
        orderDetailID: new FormControl(null, Validators.required),
        productId: new FormControl(null, Validators.required),
        unitPrice: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^-?(0|[1-9]\d*)?$/)
        ]),
        quantity: new FormControl(null, [
          Validators.required, Validators.min(1), Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        discount: new FormControl(null, [Validators.required, Validators.min(0), Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
      })
    );

  }

  onRemoveDetail(index: number) {
    let orderDetails = (<FormArray>this.orderForm.get('details'));
    orderDetails.removeAt(index);
  }
//#endregion

//#region Handle Form
  private untouchControls() {

    Object.keys(
      this.orderForm.controls
    ).forEach((key: string) => {
      if(key != 'customerId') {
        if(this.orderForm.controls[key].touched) {
          this.orderForm.controls[key].markAsUntouched();
        }
      }
    });

  }

  private initializeForm() {
    this.savingRecord = false;
    let orderDetails = this.initializeDetailsForm();
    this.orderForm = new FormGroup({
      'orderId' : new FormControl(this.order.orderId),
      'customerId' : new FormControl(this.order.customerId, Validators.required),
      'employeeId' : new FormControl(this.order.employeeId, Validators.required),
      'orderDate' : new FormControl(null, Validators.required),
      'requiredDate' : new FormControl(null, Validators.required),
      'shippedDate' : new FormControl(null, Validators.required),
      'shipperId' : new FormControl(this.order.shipperId, Validators.required),
      'freight' : new FormControl(this.order.freight, Validators.required),
      'shipName' : new FormControl(this.order.shipName, Validators.required),
      'shipAddress' : new FormControl(this.order.shipAddress, Validators.required),
      'shipCity' : new FormControl(this.order.shipCity, Validators.required),
      'shipRegion' : new FormControl(this.order.shipRegion, Validators.required),
      'shipPostalCode' : new FormControl(this.order.shipPostalCode, Validators.required),
      'shipCountry' : new FormControl(this.order.shipCountry, Validators.required),
      'details': orderDetails
    });

    this.orderForm.controls['orderId'].disable();
    if(Object.keys(this.order).length > 0)
      this.fillDates();

  }

  private fillDates() {
    this.orderForm.patchValue({
      orderDate : formatDate(this.getDate(this.order.orderDate), 'yyyy-MM-dd', 'en'),
      requiredDate : formatDate(this.getDate(this.order.requiredDate), 'yyyy-MM-dd', 'en'),
      shippedDate : formatDate(this.getDate(this.order.shippedDate), 'yyyy-MM-dd', 'en')
    });
  }

  private clearForm() {
    this.savingRecord = false;
    this.router.navigate(['/orders/order-edit']);
    this.order = {} as Order;
    this.initializeForm();
    this.onAddDetail();
  }

  private requiredFieldsValid(): boolean {
    this.savingRecord = true;
    if(!this.orderForm.valid) {
      this.displayModalMessage(
        "There are required fields that you must complete."
      );
    }

    return this.orderForm.valid;
  }

  private allFieldsEmpty(): boolean {
    let returnValue = true;

    Object.keys(
      this.orderForm.controls
    ).forEach((key: string) => {
      const controlValue = this.orderForm.controls[key].value;

      if(controlValue)
        if(key == 'details') {
          if(controlValue.length > 1) {
            returnValue = false;
            return;
          } else if(controlValue.length = 1) {
            if(controlValue[0]['productId'] ||
               controlValue[0]['unitPrice'] ||
               controlValue[0]['quantity'] ||
               controlValue[0]['discount']) {
              returnValue = false;
              return;
            }
          }
        }
      else {
        returnValue = false;
        return;
      }

    });

    return returnValue;
  }

  private getParameters() {
    this.setCustomers();
    this.setEmployees();
    this.setRegions();
    this.setShippers();
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

  private setCustomers() {
    this.customersService.getCustomers(1, 99999).subscribe({
    next: response => {
      if (response.result && response.pagination) {
        this.customers = response.result;
        // this.pagination = response.pagination;
      }
    }
    });
  }

  private getDate(dateValue: Date): Date {
    if(Object.keys(this.order).length >0) {
      return new Date(this.formatDate(dateValue));
    }

    return new Date();
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [month, day, year].join('-');
  }

  private initializeDetailsForm() {
    let orderDetails = new FormArray([]);
    if(this.order.order_Details)
      for (let detail of this.order.order_Details) {
        orderDetails.push(
          new FormGroup({
            orderID: new FormControl(detail.orderId, Validators.required),
            orderDetailID: new FormControl(detail.orderDetailID, Validators.required),
            productId: new FormControl(detail.productId, Validators.required),
            unitPrice: new FormControl(detail.unitPrice, [
              Validators.required,
              Validators.min(0), Validators.pattern(/^-?(0|[1-9]\d*)?/)
            ]),
            quantity: new FormControl(detail.quantity, [
              Validators.required, Validators.min(1),
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ]),
            discount: new FormControl(detail.discount, [
              Validators.required, Validators.min(0), Validators.pattern(/^-?(0|[1-9]\d*)?/)
            ]),
          })
        );
      }

    return orderDetails;

  }

  get detailsControls() {
    return (this.orderForm.get('details') as FormArray).controls;
  }
//#endregion

//#region Handle Order
  private createOrUpdateOrder()  {
    let orderId = this.orderForm.controls['orderId'].value;
    this.setValuesForOrder(orderId);
    if (orderId == null)
      this.ordersService.createOrder(this.order)
          .subscribe({
            next: customerResult => {
              this.reloadSavedOrder(customerResult);
              this.toastr.success(this.bodyToast);
            },
            error: errorResult => {
              this.displayModalMessage(
                JSON.stringify(errorResult)
              );
            }
          });
    else
        this.ordersService.updateOrder(this.order)
        .subscribe({
          next: customerResult => {
            this.reloadSavedOrder(customerResult);
            this.toastr.success(this.bodyToast);
          },
            error: errorResult => {
              this.displayModalMessage(
                JSON.stringify(errorResult)
              );
            }
        });
  }

  private setValuesForOrder(orderId: number) {
    this.order = {
      customerId: this.orderForm.controls['customerId'].value,
      employeeId: this.orderForm.controls['employeeId'].value,
      orderDate: this.orderForm.controls['orderDate'].value,
      requiredDate: this.orderForm.controls['requiredDate'].value,
      shippedDate: this.orderForm.controls['shippedDate'].value,
      shipperId: this.orderForm.controls['shipperId'].value,
      freight: this.orderForm.controls['freight'].value,
      shipName: this.orderForm.controls['shipName'].value,
      shipAddress: this.orderForm.controls['shipAddress'].value,
      shipCity: this.orderForm.controls['shipCity'].value,
      shipRegion: this.orderForm.controls['shipRegion'].value,
      shipPostalCode: this.orderForm.controls['shipPostalCode'].value,
      shipCountry: this.orderForm.controls['shipCountry'].value,
      order_Details: this.orderForm.controls['details'].value,
        } as Order ;

      if (orderId != null)
        this.order.orderId = orderId;
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

  private reloadSavedOrder(order: Order) {
    if(order) {
      const orderId = order.orderId;
      this.router.navigate([`/orders/order-edit/${orderId}`]);
    }
  }
//#endregion

//#region Modals
  private displayModalYesNo(buttonName: string, modalBody: string) {

    if(buttonName == 'new' && this.allFieldsEmpty()) {
      this.untouchControls();
      return;
    }

    let confirmationModalData = {
      title: 'Customers',
      message: modalBody,
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    this.confirmService.confirmationModalData = confirmationModalData;

    this.confirmService.confirm().subscribe({
      next: buttonPressed => {
        if (buttonPressed)
          switch(buttonName) {
            case "new":
              this.clearForm();
              break;
            case "save":
              if(this.requiredFieldsValid())
                this.createOrUpdateOrder();
              break;
          }
        }
    });
  }

  private displayModalMessage(body: string) {

    const modalMessageData: ModalMessageData = {
      title: 'Orders', body: body, button: 'btn-danger'
    }

    this.modalRef = this.modalService.show(ShowMessageComponent, { initialState : { modalMessageData } });
  }
//#endregion

}
