import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'src/app/_models/customer';
import { CustomersService } from 'src/app/_services/customers.service';

@Component({
  selector: 'app-customer-edit',
  templateUrl: './customer-edit.component.html',
  styleUrls: ['./customer-edit.component.css']
})
export class CustomerEditComponent {
  customer?: Customer;
  customerForm: FormGroup = new FormGroup({});

  constructor(private customersService: CustomersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeForm();
    this.SetCustomer();
  }

  private SetCustomer() {
    const customerId = this.route.snapshot.paramMap.get('customerId');
    this.customersService.getCustomer(customerId!).subscribe(
      {
        next: customerResult => {
          console.log(customerResult);
          this.customer = customerResult;
          this.initializeForm();
        }
      }
    );
  }

  private initializeForm() {
    this.customerForm = new FormGroup({
      'customerId' : new FormControl(this.customer?.customerId),
      'companyName' : new FormControl(this.customer?.companyName),
      'contactName' : new FormControl(this.customer?.contactName),
      'contactTitle' : new FormControl(this.customer?.contactTitle),
      'address' : new FormControl(this.customer?.address),
      'city' : new FormControl(this.customer?.city),
      'regionId' : new FormControl(this.customer?.regionId),
      'postalCode' : new FormControl(this.customer?.postalCode),
      'country' : new FormControl(this.customer?.country),
      'phone' : new FormControl(this.customer?.phone),
      'fax' : new FormControl(this.customer?.fax)
    })

    this.customerForm.controls['customerId'].disable();
  }

}
