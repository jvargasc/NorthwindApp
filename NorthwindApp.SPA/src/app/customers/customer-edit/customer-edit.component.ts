import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  modalTitle: string = "modal Title!!";
  modalBody: string = "modal Body!!";

  constructor(private customersService: CustomersService, private regionsService: RegionsService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getParameters();
    this.initializeForm();
    this.SetCustomer();
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
        this.router.navigate(['/customers/customer-list']);
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
    this.customer = {} as Customer;
    this.initializeForm();
    this.router.navigate(['/customers/customer-edit']);
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

  private SetCustomer() {
    let myClass : { id: number, name: string } [] = [];

    const customerId = this.route.snapshot.paramMap.get('customerId');
    this.customersService.getCustomer(customerId!).subscribe(
      {
        next: customerResult => {
          this.customer = customerResult;
          this.initializeForm();
        }
      }
    );
  }

  private initializeForm() {
    let regionId = 0
    if(this.customer?.regionId) regionId = this.customer?.regionId;

    this.customerForm = new FormGroup({
      'customerId' : new FormControl(this.customer?.customerId),
      'companyName' : new FormControl(this.customer?.companyName),
      'contactName' : new FormControl(this.customer?.contactName),
      'contactTitle' : new FormControl(this.customer?.contactTitle),
      'address' : new FormControl(this.customer?.address),
      'city' : new FormControl(this.customer?.city),
      'regionId': new FormControl(this.customer?.regionId),
      'postalCode' : new FormControl(this.customer?.postalCode),
      'country' : new FormControl(this.customer?.country),
      'phone' : new FormControl(this.customer?.phone),
      'fax' : new FormControl(this.customer?.fax)
    })

    // 'regionId' : new FormControl(this.customer?.regionId),
    this.customerForm.controls['customerId'].disable();
    // console.log(this.customerForm);
  }

}
