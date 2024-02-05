import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Region } from 'src/app/_models/region';
import { RegionsService } from 'src/app/_services/regions.service';

@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrls: ['./region-edit.component.css']
})
export class RegionEditComponent implements OnInit {
  region: Region = {} as Region;
  regionForm: FormGroup = new FormGroup({});
  modalTitle: string = "modal Title!!";
  modalBody: string = "modal Body!!";

  constructor( private regionsservice: RegionsService, private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit() {
    this.setParameters();
    this.initializeForm();
    this.setRegion();
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
        this.router.navigate(['/regions/region-list']);
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

    private setRegion() {
    const regionId = this.route.snapshot.paramMap.get('regionId');
    console.log(regionId);
    if(regionId)
      this.regionsservice.getRegion(+regionId).subscribe(
      {
        next: regionResult => {
          this.region = regionResult;
          this.initializeForm();
        }
      }
      );
  }

  private displayYesNoModal() {
    const btnShowModal = document.getElementById("showModal");
    if(btnShowModal)
      btnShowModal.click();
  }

  private clearForm() {
    this.region = {} as Region;
    this.initializeForm();
    this.router.navigate(['/regions/region-edit']);
  }

  private initializeForm() {
    this.regionForm = new FormGroup({
      'regionId': new FormControl(this.region.regionId),
      'regionDescription': new FormControl(this.region.regionDescription)
    });

    this.regionForm.controls['regionId'].disable();
  }

  private setParameters() {
    // this.getSuppliers();
    // this.getCategories();
  }

}
