import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { Region } from 'src/app/_models/region';

import { Supplier } from 'src/app/_models/supplier';
import { RegionsService } from 'src/app/_services/regions.service';
import { SuppliersService } from 'src/app/_services/suppliers.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  suppliers: Supplier[] = [];
  regions: Region[] = [];
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 10;

  constructor(private suppliersService: SuppliersService, private regionsService: RegionsService, private router: Router) {  }

  ngOnInit() {
    this.loadSuppliers();
  }

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadSuppliers();
    }
  }

  private loadSuppliers() {

    this.suppliersService.getSuppliers(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.suppliers = response.result;
          this.pagination = response.pagination;
        }
      }
    });

  }

  buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
      case "new":
        this.router.navigate(['/suppliers/supplier-edit']);
        break;
      case "refresh":
        location.reload();
        break;
      case "search":
        console.log(buttonName);
        break;
    }
  }

  getRegionDescription(regionId: number) : string | undefined {
    return this.regions.find(r => r.regionId == regionId)?.regionDescription;
  }

}
