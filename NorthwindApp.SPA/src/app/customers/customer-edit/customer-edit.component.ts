import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/_models/customer';
import { Region } from 'src/app/_models/region';
import { CustomersService } from 'src/app/_services/customers.service';
import { RegionsService } from 'src/app/_services/regions.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent {
  customer?: Customer;
  customerForm: FormGroup = new FormGroup({});
  regions: Region[] = [];

  constructor(private customersService: CustomersService, private regionsService: RegionsService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getParameters();
    this.initializeForm();
    this.SetCustomer();
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
      'regionId': new FormControl(this.regions[0]),
      'postalCode' : new FormControl(this.customer?.postalCode),
      'country' : new FormControl(this.customer?.country),
      'phone' : new FormControl(this.customer?.phone),
      'fax' : new FormControl(this.customer?.fax)
    })

    // 'regionId' : new FormControl(this.customer?.regionId),
    this.customerForm.controls['customerId'].disable();
    console.log(this.customerForm);
  }

}
