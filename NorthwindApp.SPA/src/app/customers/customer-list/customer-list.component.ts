import { Component, OnInit } from '@angular/core';

import { Customer } from 'src/app/_models/customer';
import { CustomersService } from 'src/app/_services/customers.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.customersService.getCustomers().subscribe(
      {
        next: customersResult => { this.customers = customersResult; }
      }
    );
  }

  buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
      case "refresh":
        location.reload();
        break;
      case "search":
        console.log(buttonName);
        break;
    }
  }

}
