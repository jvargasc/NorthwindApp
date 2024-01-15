import { Component, EventEmitter, Output } from '@angular/core';
import { Customer } from 'src/app/_models/customer';
import { CustomersService } from 'src/app/_services/customers.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {

  customers: Customer[] = [];

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.customersService.getCustomers().subscribe(
      {
        next: customersResult => { this.customers = customersResult; }
      }
    );
  }

  toolbarButtonWasClicked(buttonName: string) {
    switch(buttonName)
    {
      case "refresh":
        console.log(buttonName);
        break;
      case "search":
        console.log(buttonName);
        break;
    }
  }

}
