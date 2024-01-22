import { Component, OnInit } from '@angular/core';
import { Region } from 'src/app/_models/region';
import { RegionsService } from 'src/app/_services/regions.service';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.css']
})
export class RegionListComponent implements OnInit {

  regions: Region[] = [];

  constructor(private regionsService: RegionsService) { }

  ngOnInit() {
    this.regionsService.getRegions().subscribe(
      {
        next: regionsResult => { this.regions = regionsResult; }
      }
    );
  }

  buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
      case "refresh":
        location.reload();
        break;
      case "search":
        console.log(buttonName);
        break;
    }
  }

}
