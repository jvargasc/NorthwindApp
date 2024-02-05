import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Region } from 'src/app/_models/region';
import { Supplier } from 'src/app/_models/supplier';
import { RegionsService } from 'src/app/_services/regions.service';
import { SuppliersService } from 'src/app/_services/suppliers.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {

  supplier?: Supplier;
  supplierForm: FormGroup = new FormGroup({});
  modalTitle: string = "modal Title!!";
  modalBody: string = "modal Body!!";
  regions: Region[] = [];

  constructor( private suppliersService: SuppliersService, private regionsService: RegionsService, private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.initializeForm();
    this.setParameters();
    this.SetSupplier();
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
        this.router.navigate(['/suppliers/supplier-list']);
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
    this.supplier = {} as Supplier;
    this.initializeForm();
    this.router.navigate(['/suppliers/supplier-edit']);
  }

  private SetSupplier() {
    const supplierId = Number(this.route.snapshot.paramMap.get('supplierId'));
    this.suppliersService.getSupplier(+supplierId).subscribe(
      {
        next: supplierResult => {
          this.supplier = supplierResult;
          this.initializeForm();
        }
      }
    );
  }

  private initializeForm() {
      this.supplierForm = new FormGroup({
        'supplierId' : new FormControl(this.supplier?.supplierId),
        'companyName' : new FormControl(this.supplier?.companyName),
        'contactName' : new FormControl(this.supplier?.contactName),
        'contactTitle' : new FormControl(this.supplier?.contactTitle),
        'address' : new FormControl(this.supplier?.address),
        'city' : new FormControl(this.supplier?.city),
        'regionId' : new FormControl(this.supplier?.regionId),
        'postalCode' : new FormControl(this.supplier?.postalCode),
        'country' : new FormControl(this.supplier?.country),
        'phone' : new FormControl(this.supplier?.phone),
        'fax' : new FormControl(this.supplier?.fax),
        'homePage' : new FormControl(this.supplier?.homePage)
      });

      this.supplierForm.controls['supplierId'].disable();
  }

  private setParameters() {
    this.regionsService.getRegions().subscribe(
      {
        next: regionsResult => {
          this.regions = regionsResult;
        }
      }
    );
  }

}
