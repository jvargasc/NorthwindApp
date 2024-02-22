import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Region } from 'src/app/_models/region';

import { Territory } from 'src/app/_models/territory';
import { RegionsService } from 'src/app/_services/regions.service';
import { TerritoriesService } from 'src/app/_services/territories.service';

@Component({
  selector: 'app-territory-list',
  templateUrl: './territory-list.component.html',
  styleUrls: ['./territory-list.component.css']
})
export class TerritoryListComponent implements OnInit {

  territories: Territory[] = [];
  regions: Region[] = [];

  constructor(private territoriesService: TerritoriesService, private regionsService: RegionsService, private router: Router) {  }

  ngOnInit() {
    this.territoriesService.getTerritories().subscribe(
      {
        next: territoriesResult => {
          this.territories = territoriesResult;
        }
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
        this.router.navigate(['/territories/territory-edit']);
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
