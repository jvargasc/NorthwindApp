import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Territory } from 'src/app/_models/territory';
import { TerritoriesService } from 'src/app/_services/territories.service';

@Component({
  selector: 'app-territory-list',
  templateUrl: './territory-list.component.html',
  styleUrls: ['./territory-list.component.css']
})
export class TerritoryListComponent implements OnInit {

  territories: Territory[] = [];

  constructor(private territoriesService: TerritoriesService, private router: Router) {  }

  ngOnInit() {
    this.territoriesService.getTerritories().subscribe(
      {
        next: territoriesResult => { this.territories = territoriesResult; }
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

}
