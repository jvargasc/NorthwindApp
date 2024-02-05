import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  modalTitle: string = "modal Title!!";
  modalBody: string = "modal Body!!";
  regions: Region[] = [];

  constructor( private territoriesService: TerritoriesService, private regionsService: RegionsService, private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.initializeForm();
    this.setParameters();
    this.setTerritory();
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
        this.router.navigate(['/territories/territory-list']);
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

  getRegion(regionId: number) : string | undefined {
    return this.regions.find(r => r.regionId == regionId)?.regionDescription;
  }

  private displayYesNoModal() {
    const btnShowModal = document.getElementById("showModal");
    if(btnShowModal)
      btnShowModal.click();
  }

  private clearForm() {
    this.territory = {} as Territory;
    this.initializeForm();
    this.router.navigate(['/territories/territory-edit']);
  }

  private initializeForm() {
    this.territoryForm = new FormGroup({
      'territoryId' : new FormControl(this.territory?.territoryId),
      'territoryDescription' : new FormControl(this.territory?.territoryDescription),
      'regionId' : new FormControl(this.territory?.regionId)
      });

    this.territoryForm.controls['territoryId'].disable();
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

  private setParameters() {
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

}
