import { Component, OnInit } from '@angular/core';

import { ShippersService } from 'src/app/_services/shippers.service';
import { Shipper } from 'src/app/_models/shipper';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-shipper-list',
  templateUrl: './shipper-list.component.html',
  styleUrls: ['./shipper-list.component.css']
})
export class ShipperListComponent implements OnInit {

  shippers: Shipper[] = [];

  constructor(private shippersService: ShippersService, private router: Router) { }

  ngOnInit() {
    this.shippersService.getShippers().subscribe(
      {
        next: shippersResult => { this.shippers = shippersResult; }
      }
    );
  }

  buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
      case "new":
        this.router.navigate(['/shippers/shipper-edit']);
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
