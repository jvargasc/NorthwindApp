import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Supplier } from 'src/app/_models/supplier';
import { SuppliersService } from 'src/app/_services/suppliers.service';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  suppliers: Supplier[] = [];

  constructor(private suppliersService: SuppliersService, private router: Router) {  }

  ngOnInit() {
    this.suppliersService.getSuppliers().subscribe(
      {
        next: suppliersService => { this.suppliers = suppliersService; }
      }
    )
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

}
