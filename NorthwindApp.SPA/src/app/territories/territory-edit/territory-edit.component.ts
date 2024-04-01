import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ModalMessageData } from 'src/app/_models/modalmessagedata';

import { Region } from 'src/app/_models/region';
import { Territory } from 'src/app/_models/territory';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { RegionsService } from 'src/app/_services/regions.service';
import { TerritoriesService } from 'src/app/_services/territories.service';
import { ShowMessageComponent } from 'src/app/_shared/modals/show-message/show-message.component';

@Component({
  selector: 'app-territory-edit',
  templateUrl: './territory-edit.component.html',
  styleUrls: ['./territory-edit.component.css']
})
export class TerritoryEditComponent implements OnInit {

  territory?: Territory;
  territoryForm: FormGroup = new FormGroup({});
  regions: Region[] = [];
  toolbarButtonPressed = "";
  bodyToast = "Record successfully saved!!!";
  savingRecord = false;

  modalRef: BsModalRef;

  constructor( private territoriesService: TerritoriesService, private regionsService: RegionsService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private confirmService: ConfirmService, private modalService: BsModalService ) { }

  ngOnInit() {
    this.getParameters();
    this.initializeForm();
    this.setTerritory();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";

    switch(buttonName){
      case "new":
        modalBody = "Do you wish to clear this Territory and create a new one?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Territory?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "return":
        this.router.navigate(['/territories/territory-list']);
        break;
    }
  }

  modalButtonWasClicked(button: string) {
    switch(button) {
      case "btnYes":
        if (this.toolbarButtonPressed == "new")
          this.clearForm();
        if (this.toolbarButtonPressed == "save") {
            if(this.requiredFieldsValid())
              this.createOrUpdateTerritory();
            else
              this.savingRecord = false;
        }
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
      this.territoryForm.controls
    ).forEach((key: string) => {
      if(key != 'customerId') {
        if(this.territoryForm.controls[key].touched) {
          this.territoryForm.controls[key].markAsUntouched();
        }
      }
    });

  }

  private initializeForm() {
    this.savingRecord = false;
    this.territoryForm = new FormGroup({
      'territoryId' : new FormControl(this.territory?.territoryId),
      'territoryDescription' : new FormControl(this.territory?.territoryDescription, Validators.required),
      'regionId' : new FormControl(this.territory?.regionId, Validators.required)
      });

    this.territoryForm.controls['territoryId'].disable();
  }

  private clearForm() {
    this.savingRecord = false;
    this.router.navigate(['/territories/territory-edit']);
    this.territory = {} as Territory;
    this.initializeForm();
  }

  private requiredFieldsValid(): boolean {
    this.savingRecord = true;
    if(!this.territoryForm.valid) {
      this.displayModalMessage("There are required fields that you must complete.");
    }

    return this.territoryForm.valid;
  }

  private allFieldsEmpty(): boolean {
    let returnValue = true;

    Object.keys(
      this.territoryForm.controls
    ).forEach((key: string) => {
      if(this.territoryForm.controls[key].value) {
        returnValue = false;
        return;
      }
    });

    return returnValue;
  }

  private getParameters() {
    this.setregions()
  }

  private setregions() {
    this.regionsService.getRegions().subscribe(
      {
        next: regionsResult => {
          this.regions = regionsResult;
        }
      }
    );
  }
//#endregion

//#region Handle Territory
  private createOrUpdateTerritory() {
    let territoryId = this.territoryForm.controls['territoryId'].value;
    this.setValuesForTerritory(territoryId);
    if (territoryId == null)
      this.territoriesService.createTerritory(this.territory)
          .subscribe({
            next: territoryResult => {
              this.reloadSavedTerritory(territoryResult);
              this.toastr.success(this.bodyToast);
            },
            error: errorResult => {
              this.displayModalMessage(
                JSON.stringify(errorResult)
              );
            }
          });
    else
        this.territoriesService.updateTerritory(this.territory)
        .subscribe({
          next: territoryResult => {
            this.reloadSavedTerritory(territoryResult);
            this.toastr.success(this.bodyToast);
          },
            error: errorResult => {
              this.displayModalMessage(
                JSON.stringify(errorResult)
              );
            }
        });
  }

  private setValuesForTerritory(territoryId: number) {

    this.territory = {
      territoryDescription: this.territoryForm.controls['territoryDescription'].value,
      regionId: this.territoryForm.controls['regionId'].value,
        } as Territory ;

    if (territoryId != null)
      this.territory.territoryId = territoryId;
  }

  private setTerritory() {
    const territoryId = this.route.snapshot.paramMap.get('territoryId');
    if(territoryId)
      this.territoriesService.getTerritory(territoryId).subscribe(
        {
          next: territoryResult => {
            this.territory = territoryResult;
            this.initializeForm();
          }
        }
      );
  }

  private reloadSavedTerritory(territory: Territory) {
    if(territory) {
      const territoryId = territory.territoryId;
      if (territoryId)
        this.router.navigate([`/territories/territory-edit/${territoryId}`]);
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
      title: 'Customers',
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
                this.createOrUpdateTerritory();
              break;
          }
        }
    });
  }

  private displayModalMessage(body: string) {

    const modalMessageData: ModalMessageData = {
      title: 'Territories', body: body, button: 'btn-danger'
    }

    this.modalRef = this.modalService.show(ShowMessageComponent, { initialState : { modalMessageData } });
  }
//#endregion

}
