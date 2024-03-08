import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Region } from 'src/app/_models/region';
import { Territory } from 'src/app/_models/territory';
import { RegionsService } from 'src/app/_services/regions.service';
import { TerritoriesService } from 'src/app/_services/territories.service';

@Component({
  selector: 'app-territory-edit',
  templateUrl: './territory-edit.component.html',
  styleUrls: ['./territory-edit.component.css']
})
export class TerritoryEditComponent implements OnInit {

  territory?: Territory;
  territoryForm: FormGroup = new FormGroup({});
  regions: Region[] = [];
  modalTitle = "Territory";
  modalYesNoBody = "";
  modalMessageBody = "";
  toolbarButtonPressed = "";
  headerToast = "Territory";
  bodyToast = "Record successfully saved!!!";
  savingRecord = false;

  constructor( private territoriesService: TerritoriesService, private regionsService: RegionsService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService ) { }

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
        this.displayModalYesNo(modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Territory?";
        this.displayModalYesNo(modalBody);
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
        }
      break;
      case "btnNo":
        break;
      }

    this.toolbarButtonPressed = ""
  }
//#endregion

//#region Handle Form
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
    this.territory = {} as Territory;
    this.initializeForm();
    this.router.navigate(['/territories/territory-edit']);
  }

  private requiredFieldsValid(): boolean {
    this.savingRecord = true;
    if(!this.territoryForm.valid) {
      this.modalMessageBody = "There are required fields that you must complete.";
      this.displayModalMessage();
    }

    return this.territoryForm.valid;
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
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
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
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
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
//#endregion

}
