import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  modalTitle = "Region";
  modalYesNoBody = "";
  modalMessageBody = "";
  toolbarButtonPressed = "";
  headerToast = "Region";
  bodyToast = "Record successfully saved!!!";

  @ViewChild('regionDescription') regionDescription: ElementRef;

  constructor( private regionsService: RegionsService, private route: ActivatedRoute, private router: Router
  ) { }

  ngOnInit() {
    this.setParameters();
    this.initializeForm();
    this.setRegion();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";
    switch(buttonName) {
      case "new":
        modalBody = "Do you wish to clear this Region and create a new one?";
        this.displayModalYesNo(modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Region?";
        this.displayModalYesNo(modalBody);
        break;
      case "return":
        this.router.navigate(['/regions/region-list']);
        break;
    }
  }

  modalButtonWasClicked(button: string) {
    switch(button) {
      case "btnYes":
        if (this.toolbarButtonPressed == "new")
          this.clearForm();
        if (this.toolbarButtonPressed == "save")
            if(this.requiredFieldsValid())
              this.createOrUpdateRegion();
      break;
      case "btnNo":
        break;
      }

    this.toolbarButtonPressed = ""
  }
//#endregion

//#region Handle Form
  private initializeForm() {
    this.regionForm = new FormGroup({
      'regionId': new FormControl(this.region.regionId),
      'regionDescription': new FormControl(this.region.regionDescription)
    });

    this.regionForm.controls['regionId'].disable();
  }

  private clearForm() {
    this.region = {} as Region;
    this.initializeForm();
    this.router.navigate(['/regions/region-edit']);
  }

  private requiredFieldsValid(): boolean {
    let displayModalMessage = false;
    if(!this.regionForm.valid) {
      for (const field in this.regionForm.controls) { // 'field' is a string
        const tmpControl = this.regionForm.get(field); // 'control' is a FormControl
        if(tmpControl.invalid) {
          switch(field) {
            case "regionDescription":
              this.regionDescription.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            }
          }
        }

     }

    if(displayModalMessage) {
      this.modalMessageBody = "There are required fields that you must complete.";
      this.displayModalMessage();
    }

    return !displayModalMessage;
  }
//#endregion

//#region Handle Region
  private setRegion() {
    const regionId = this.route.snapshot.paramMap.get('regionId');
    console.log(regionId);
    if(regionId)
      this.regionsService.getRegion(+regionId).subscribe(
      {
        next: regionResult => {
          this.region = regionResult;
          this.initializeForm();
        }
      }
      );
  }

  private createOrUpdateRegion() {
    let regionId = this.regionForm.controls['regionId'].value;

    this.setValuesForRegion(regionId);
    if (regionId == null){
      this.regionsService.createProduct(this.region)
          .subscribe({
            next: productResult => {
              this.reloadSavedRegion(productResult);
              this.toastClick();
            },
            error: errorResult => {
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
            }
          });}
    else
        this.regionsService.updateProduct(this.region)
        .subscribe({
          next: productResult => {
            this.reloadSavedRegion(productResult);
            this.toastClick();
          },
            error: errorResult => {
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
            }
        });
  }

  private setValuesForRegion(regionId: number) {

    this.region = {
        regionDescription: this.regionForm.controls['regionDescription'].value,
      } as Region ;

    if (regionId != null)
      this.region.regionId = regionId;

  }

  private reloadSavedRegion(region: Region) {
    if(region) {
      const regionId = region.regionId;
      this.router.navigate([`/regions/region-edit/${regionId}`]);
    }
  }
//#endregion

//#region Modals and Toasts
  private displayModalYesNo(modalBody: string) {
    this.modalYesNoBody = modalBody;
    const btnShowModalYesNo = document.getElementById("showModalYesNo");
    if(btnShowModalYesNo)
      btnShowModalYesNo.click();
  }

  private displayModalMessage() {
    const btnShowModalMessage = document.getElementById("showModalMessage");
    if(btnShowModalMessage)
      btnShowModalMessage.click();
  }

  private toastClick() {
    const btnToast = document.getElementById("liveToastBtn");
    if(btnToast){
      btnToast.click();
      btnToast.click();
    }
  }
//#endregion


  private setParameters() {
    // this.getSuppliers();
    // this.getCategories();
  }

}
