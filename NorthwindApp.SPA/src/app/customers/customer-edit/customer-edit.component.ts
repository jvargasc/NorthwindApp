import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Customer } from 'src/app/_models/customer';
import { Region } from 'src/app/_models/region';
import { CustomersService } from 'src/app/_services/customers.service';
import { RegionsService } from 'src/app/_services/regions.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent implements OnInit {
  customer?: Customer;
  customerForm: FormGroup = new FormGroup({});
  regions: Region[] = [];
  modalTitle = "Customer";
  modalYesNoBody = "";
  modalMessageBody = "";
  toolbarButtonPressed = "";
  headerToast = "Customer";
  bodyToast = "Record successfully saved!!!";
  savingRecord = false;

  constructor(private customersService: CustomersService, private regionsService: RegionsService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService ) { }

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
        this.displayModalYesNo(modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Customer?";
        this.displayModalYesNo(modalBody);
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
        }
      break;
      case "btnNo":
        break;
      }

    this.toolbarButtonPressed = ""
  }
//#endregion

//#region Handle Form
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
    this.customer = {} as Customer;
    this.initializeForm();
    this.router.navigate(['/customers/customer-edit']);
  }

  private requiredFieldsValid(): boolean {
    this.savingRecord = true;
    if(!this.customerForm.valid) {
      this.modalMessageBody = "There are required fields that you must complete.";
      this.displayModalMessage();
    }

    return this.customerForm.valid;
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
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
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
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
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
