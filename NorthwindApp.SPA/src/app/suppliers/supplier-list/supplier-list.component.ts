import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private suppliersService: SuppliersService, private regionsService: RegionsService, private router: Router) {  }

  ngOnInit() {
    this.suppliersService.getSuppliers().subscribe(
      {
        next: suppliersService => { this.suppliers = suppliersService; }
      }
    );
    this.regionsService.getRegions().subscribe(
      {
        next: regionsResult => {
              this.regions = regionsResult;
        }
      }
    );
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
