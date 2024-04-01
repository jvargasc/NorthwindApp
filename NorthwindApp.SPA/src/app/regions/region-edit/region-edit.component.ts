import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ModalMessageData } from 'src/app/_models/modalmessagedata';

import { Region } from 'src/app/_models/region';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { RegionsService } from 'src/app/_services/regions.service';
import { ShowMessageComponent } from 'src/app/_shared/modals/show-message/show-message.component';

@Component({
  selector: 'app-region-edit',
  templateUrl: './region-edit.component.html',
  styleUrls: ['./region-edit.component.css']
})
export class RegionEditComponent implements OnInit {
  region: Region = {} as Region;
  regionForm: FormGroup = new FormGroup({});
  toolbarButtonPressed = "";
  bodyToast = "Record successfully saved!!!";
  savingRecord = false;

  modalRef: BsModalRef;

  constructor( private regionsService: RegionsService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private confirmService: ConfirmService, private modalService: BsModalService ) { }

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
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Region?";
        this.displayModalYesNo(buttonName, modalBody);
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
            else
              this.savingRecord = false;
      break;
      case "btnNo":
        break;
      }

    this.toolbarButtonPressed = ""
  }
//#endregion

//#region Handle Form
  private untouchControls() {

    Object.keys(
      this.regionForm.controls
    ).forEach((key: string) => {
      if(key != 'customerId') {
        if(this.regionForm.controls[key].touched) {
          this.regionForm.controls[key].markAsUntouched();
        }
      }
    });

  }
  private initializeForm() {
    this.savingRecord = false;
    this.regionForm = new FormGroup({
      'regionId': new FormControl(this.region.regionId),
      'regionDescription': new FormControl(this.region.regionDescription, Validators.required)
    });

    this.regionForm.controls['regionId'].disable();
  }

  private clearForm() {
    this.savingRecord = false;
    this.router.navigate(['/regions/region-edit']);
    this.region = {} as Region;
    this.initializeForm();
  }

  private requiredFieldsValid(): boolean {
    this.savingRecord = true;
    if(!this.regionForm.valid) {
      this.displayModalMessage(
        "There are required fields that you must complete."
      );
    }

    return this.regionForm.valid;
  }

  private allFieldsEmpty(): boolean {
    let returnValue = true;

    Object.keys(
      this.regionForm.controls
    ).forEach((key: string) => {
      if(this.regionForm.controls[key].value) {
        returnValue = false;
        return;
      }
    });

    return returnValue;
  }
//#endregion

//#region Handle Region
  private createOrUpdateRegion() {
    let regionId = this.regionForm.controls['regionId'].value;

    this.setValuesForRegion(regionId);
    if (regionId == null){
      this.regionsService.createProduct(this.region)
          .subscribe({
            next: productResult => {
              this.reloadSavedRegion(productResult);
              this.toastr.success(this.bodyToast);
            },
            error: errorResult => {
              this.displayModalMessage(
                JSON.stringify(errorResult)
              );
            }
          });}
    else
        this.regionsService.updateProduct(this.region)
        .subscribe({
          next: productResult => {
            this.reloadSavedRegion(productResult);
            this.toastr.success(this.bodyToast);
          },
            error: errorResult => {
              this.displayModalMessage(
                JSON.stringify(errorResult)
              );
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

  private setRegion() {
    const regionId = this.route.snapshot.paramMap.get('regionId');
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

  private reloadSavedRegion(region: Region) {
    if(region) {
      const regionId = region.regionId;
      this.router.navigate([`/regions/region-edit/${regionId}`]);
    }
  }
//#endregion

//#region Modals
  private displayModalYesNo(buttonName: string, modalBody: string) {

    if(buttonName == 'new' && this.allFieldsEmpty()) {
      this.untouchControls();
      return;
    }

    let confirmationModalData = {
      title: 'Regions',
      message: modalBody,
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    this.confirmService.confirmationModalData = confirmationModalData;

    this.confirmService.confirm().subscribe({
      next: buttonPressed => {
        if (buttonPressed)
          switch(buttonName) {
            case "new":
              this.clearForm();
              break;
            case "save":
              if(this.requiredFieldsValid())
                this.createOrUpdateRegion();
              break;
          }
        }
    });
  }

  private displayModalMessage(body: string) {

    const modalMessageData: ModalMessageData = {
      title: 'Regions', body: body, button: 'btn-danger'
    }

    this.modalRef = this.modalService.show(ShowMessageComponent, { initialState : { modalMessageData } });
  }
//#endregion


  private setParameters() {
    // this.getSuppliers();
    // this.getCategories();
  }

}
