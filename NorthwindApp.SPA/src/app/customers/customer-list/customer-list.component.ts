import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Customer } from 'src/app/_models/customer';
import { Pagination } from 'src/app/_models/pagination';
import { Region } from 'src/app/_models/region';
import { CustomersService } from 'src/app/_services/customers.service';
import { RegionsService } from 'src/app/_services/regions.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  customers: Customer[] = [];
  regions: Region[] = [];
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 10;

  constructor(private customersService: CustomersService,
    private regionsService: RegionsService, private router: Router ) { }

  ngOnInit() {
    this.loadCustomers();
    this.getParameters();
  }

  buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
      case "new":
        this.router.navigate(['/customers/customer-edit']);
        break;
      case "refresh":
        location.reload();
        break;
      case "search":
        console.log(buttonName);
        break;
    }
  }

  getRegion(regionId: number) : string | undefined {
    return this.regions.find(r => r.regionId == regionId)?.regionDescription;
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

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadCustomers();
    }
  }

  private loadCustomers() {
    this.customersService.getCustomers(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.customers = response.result;
          this.pagination = response.pagination;
        }
      }
    });

  }
}
