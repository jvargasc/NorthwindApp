import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { Customer } from 'src/app/_models/customer';
import { ModalMessageData } from 'src/app/_models/modalmessagedata';
import { Region } from 'src/app/_models/region';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { CustomersService } from 'src/app/_services/customers.service';
import { RegionsService } from 'src/app/_services/regions.service';
import { ShowMessageComponent } from 'src/app/_shared/modals/show-message/show-message.component';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer?: Customer;
  customerForm: FormGroup = new FormGroup({});
  regions: Region[] = [];
  toolbarButtonPressed = "";
  bodyToast = "Record successfully saved!!!";
  savingRecord = false;

  modalRef: BsModalRef;

  constructor(private customersService: CustomersService, private regionsService: RegionsService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private confirmService: ConfirmService, private modalService: BsModalService ) { }

  ngOnInit() {
    this.getParameters();
    this.initializeForm();
    this.setCustomer();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";

    switch(buttonName){
      case "new":
        modalBody = "Do you wish to clear this Customer and create a new one?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Customer?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "return":
        this.router.navigate(['/customers/customer-list']);
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
              this.createOrUpdateCustomer();
            else
              this.savingRecord = false;
        }
      break;
      case "btnNo":
        break;
      }

    this.toolbarButtonPressed = ""
  }
//#endregion

//#region Handle Form
  private untouchControls() {

    Object.keys(
      this.customerForm.controls
    ).forEach((key: string) => {
      if(key != 'customerId') {
        if(this.customerForm.controls[key].touched) {
          this.customerForm.controls[key].markAsUntouched();
        }
      }
    });

  }

  private initializeForm() {
    this.savingRecord = false;
    this.customerForm = new FormGroup({
      'customerId' : new FormControl(this.customer?.customerId, [Validators.required, Validators.minLength(1)]),
      'companyName' : new FormControl(this.customer?.companyName,  [Validators.required, Validators.minLength(1)]),
      'contactName' : new FormControl(this.customer?.contactName, Validators.required),
      'contactTitle' : new FormControl(this.customer?.contactTitle, Validators.required),
      'address' : new FormControl(this.customer?.address, Validators.required),
      'city' : new FormControl(this.customer?.city, Validators.required),
      'regionId': new FormControl(this.customer?.regionId, Validators.required),
      'postalCode' : new FormControl(this.customer?.postalCode, Validators.required),
      'country' : new FormControl(this.customer?.country, Validators.required),
      'phone' : new FormControl(this.customer?.phone, Validators.required),
      'fax' : new FormControl(this.customer?.fax)
    })

    this.customerForm.controls['customerId'].disable();
  }

  private clearForm() {
    this.savingRecord = false;
    this.router.navigate(['/customers/customer-edit']);
    this.customer = {} as Customer;
    this.initializeForm();
  }

  private requiredFieldsValid(): boolean {
    this.savingRecord = true;
    if(!this.customerForm.valid) {
      this.displayModalMessage(
        "There are required fields that you must complete."
      );
    }

    return this.customerForm.valid;
  }

  private allFieldsEmpty(): boolean {
    let returnValue = true;

    Object.keys(
      this.customerForm.controls
    ).forEach((key: string) => {
      if(this.customerForm.controls[key].value) {
        returnValue = false;
        return;
      }
    });

    return returnValue;
  }

  private getParameters() {
    this.regionsService.getRegions().subscribe(
      {
        next: regionsResult => {
          this.regions = regionsResult;
        }
      }
    );
  }
//#endregion

//#region Handle Customer
  private createOrUpdateCustomer() {
    let customerId = this.customerForm.controls['customerId'].value;
    this.setValuesForCustomer(customerId);
    if (customerId == null)
      this.customersService.createCustomer(this.customer)
          .subscribe({
            next: customerResult => {
              this.reloadSavedCustomer(customerResult);
              this.toastr.success(this.bodyToast);
            },
            error: errorResult => {
              this.displayModalMessage(
                JSON.stringify(errorResult.error.statusCode + ' - ' + errorResult.error.message)
              );
            }
          });
    else
        this.customersService.updateCustomer(this.customer)
        .subscribe({
          next: customerResult => {
            this.reloadSavedCustomer(customerResult);
            this.toastr.success(this.bodyToast);
          },
            error: errorResult => {
              this.displayModalMessage(
                JSON.stringify(errorResult)
              );
            }
        });
  }

  private setValuesForCustomer(customerId: number) {

      this.customer = {
        companyName: this.customerForm.controls['companyName'].value,
        contactName: this.customerForm.controls['contactName'].value,
        contactTitle: this.customerForm.controls['contactTitle'].value,
        address: this.customerForm.controls['address'].value,
        city: this.customerForm.controls['city'].value,
        regionId: this.customerForm.controls['regionId'].value,
        postalCode: this.customerForm.controls['postalCode'].value,
        country: this.customerForm.controls['country'].value,
        phone: this.customerForm.controls['phone'].value,
        fax: this.customerForm.controls['fax'].value
          } as Customer ;

    if (customerId != null)
      this.customer.customerId = customerId;
  }

  private setCustomer() {
    const customerId = this.route.snapshot.paramMap.get('customerId');
    if(customerId)
      this.customersService.getCustomer(+customerId).subscribe(
        {
          next: customerResult => {
            this.customer = customerResult;
            this.initializeForm();
          }
        }
      );
  }

  private reloadSavedCustomer(customer: Customer) {
    if(customer) {
      const customerId = customer.customerId;
      this.router.navigate([`/customers/customer-edit/${customerId}`]);
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
                this.createOrUpdateCustomer();
              break;
          }
        }
    });
  }

  private displayModalMessage(body: string) {

    const modalMessageData: ModalMessageData = {
      title: 'Customers', body: body, button: 'btn-danger'
    }

    this.modalRef = this.modalService.show(ShowMessageComponent, { initialState : { modalMessageData } });
  }
//#endregion
}
