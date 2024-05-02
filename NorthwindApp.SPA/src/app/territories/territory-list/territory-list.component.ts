import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
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
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 10;

  constructor(private territoriesService: TerritoriesService, private regionsService: RegionsService, private router: Router) {  }

  ngOnInit() {
    this.loadTerritories();
    this.getRegions();
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

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadTerritories();
    }
  }

  private loadTerritories() {
    this.territoriesService.getTerritories(this.pageNumber, this.pageSize).subscribe({
    next: response => {
      if (response.result && response.pagination) {
        this.territories = response.result;
        this.pagination = response.pagination;
      }
    }
    });

  }

  private getRegions() {
    this.regionsService.getRegions().subscribe(
      {
        next: regionsResult => {
          this.regions = regionsResult;
        }
      }
    );
  }

}
