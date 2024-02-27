import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Customer } from 'src/app/_models/customer';
import { Employee } from 'src/app/_models/employee';
import { Order } from 'src/app/_models/order';
import { OrderDetail } from 'src/app/_models/orderdetail';
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
  customers: Customer[]  = [];
  employees: Employee[]  = [];
  regions: Region[]  = [];
  shippers: Shipper[]  = [];
  modalTitle = "Order";
  modalYesNoBody = "";
  modalMessageBody = "";
  toolbarButtonPressed = "";
  headerToast = "Order";
  bodyToast = "Record successfully saved!!!";

  @ViewChild('customerId') customerId: ElementRef;
  @ViewChild('employeeId') employeeId: ElementRef;
  @ViewChild('orderDate') orderDate: ElementRef;
  @ViewChild('requiredDate') requiredDate: ElementRef;
  @ViewChild('shippedDate') shippedDate: ElementRef;
  @ViewChild('shipperId') shipperId: ElementRef;
  @ViewChild('freight') freight: ElementRef;
  @ViewChild('shipName') shipName: ElementRef;
  @ViewChild('shipAddress') shipAddress: ElementRef;
  @ViewChild('shipCity') shipCity: ElementRef;
  @ViewChild('shipRegion') shipRegion: ElementRef;
  @ViewChild('shipPostalCode') shipPostalCode: ElementRef;
  @ViewChild('shipCountry') shipCountry: ElementRef;
  @ViewChild('details') details: ElementRef;

  constructor( private ordersService: OrdersService, private customersService: CustomersService, private employeesService: EmployeesService, private regionsService: RegionsService, private shippersService: ShippersService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.getParameters();
    this.initializeForm();
    this.setOrder();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";
    switch(buttonName){
      case "new":
        modalBody = "Do you wish to clear this Order and create a new one?";
        this.displayModalYesNo(modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Order?";
        this.displayModalYesNo(modalBody);
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
        productId: new FormControl(null, Validators.required),
        unitPrice: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+(\.[0-9]*)$/)
        ]),
        quantity: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
        discount: new FormControl(0, [Validators.required,Validators.pattern(/^[1-9]+(\.[0-9]*)$/)]),
      })
    );
    // console.log(orderDetails);

    //for(let tmpControl of orderDetails.controls) {
    let tmpControl = orderDetails.controls[orderDetails.length - 1]
    console.log(tmpControl)
    if(!tmpControl.value) {
        tmpControl[0].nativeElement.classList.add('form-control'); //
        tmpControl[1].nativeElement.classList.add('form-control'); //ng-dirty ng-invalid ng-touched
        tmpControl[2].nativeElement.classList.add('form-control'); //ng-dirty ng-invalid ng-touched
        tmpControl[3].nativeElement.classList.add('form-control'); //ng-dirty ng-invalid ng-touched
      }
    // class="form-control ng-dirty ng-invalid ng-touched"
    //   // console.log(tmpControl.get('productId'));
    //   if(!tmpControl.value)
    //     tmpControl[0].nativeElement.classList.add('form-control');
    // }
  }

  onRemoveDetail(index: number) {
    let orderDetails = (<FormArray>this.orderForm.get('details'));
    orderDetails.removeAt(index);
  }
//#endregion

//#region Handle Form
  private initializeForm() {
    let orderDetails = this.initializeDetailsForm();

    this.orderForm = new FormGroup({
      'orderId' : new FormControl(this.order.orderId),
      'customerId' : new FormControl(this.order.customerId, Validators.required),
      'employeeId' : new FormControl(this.order.employeeId, Validators.required),
      'orderDate' : new FormControl('', Validators.required),
      'requiredDate' : new FormControl('', Validators.required),
      'shippedDate' : new FormControl('', Validators.required),
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
    this.order = {} as Order;
    this.initializeForm();
    this.router.navigate(['/orders/order-edit']);
  }

  private requiredFieldsValid(): boolean {
    let displayModalMessage = false;
    if(!this.orderForm.valid) {
      for (const field in this.orderForm.controls) { // 'field' is a string
        const tmpControl = this.orderForm.get(field); // 'control' is a FormControl
        if(tmpControl.invalid) {
          switch(field) {
            case "customerId":
              this.customerId.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "employeeId":
              this.employeeId.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "orderDate":
              this.orderDate.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "requiredDate":
              this.requiredDate.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "shippedDate":
              this.shippedDate.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "shipperId":
              this.shipperId.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "freight":
              this.freight.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "shipName":
              this.shipName.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "shipAddress":
              this.shipAddress.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "shipCity":
              this.shipCity.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "shipRegion":
              this.shipRegion.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "shipPostalCode":
              this.shipPostalCode.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "shipCountry":
              this.shipCountry.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "details":
              // for(let tmpControl of this.details.nativeElement) {
              //   // console.log(tmpControl.get('productId'));
              //   if(!tmpControl.value)
              //     tmpControl[0].nativeElement.classList.add('form-control');
              // }
              this.details.nativeElement.classList.add('ng-touched');
              for(let tmpDetails of tmpControl.value)
                console.log(tmpDetails);
              displayModalMessage = true;
            break;
            default:
              console.log(field);
          }
        }
      }
     }

    if(displayModalMessage) {
      this.modalMessageBody = "There are required fields that you must complete.";
      this.displayModalMessage();
    }

    return !displayModalMessage;
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
    this.customersService.getCustomers().subscribe(
      {
        next: customersResult => {
          this.customers = customersResult;
        }
      }
    );
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
            productId: new FormControl(detail.productId, Validators.required),
            unitPrice: new FormControl(detail.unitPrice, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ]),
            quantity: new FormControl(detail.quantity, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ]),
            discount: new FormControl(detail.discount,
              [Validators.required,Validators.pattern(/^[1-9]+(\.[0-9]*)$/)]),
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
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
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
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
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
  private displayModalYesNo(modalBody: string) {
    this.modalYesNoBody = modalBody;
    const btnShowModalYesNo = document.getElementById("showModalYesNo");
    if(btnShowModalYesNo)
      btnShowModalYesNo.click();
  }

  private displayModalMessage() {
    const btnShowModalMessage = document.getElementById("showModalMessage");
    if(btnShowModalMessage)
      btnShowModalMessage.click();
  }
//#endregion

}
