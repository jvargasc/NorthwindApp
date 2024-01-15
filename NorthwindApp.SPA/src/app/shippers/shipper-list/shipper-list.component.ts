import { Component, OnInit } from '@angular/core';
import { ShippersService } from 'src/app/_services/shippers.service';
import { Shipper } from 'src/app/_models/shipper';

@Component({
  selector: 'app-shipper-list',
  templateUrl: './shipper-list.component.html',
  styleUrls: ['./shipper-list.component.css']
})
export class ShipperListComponent implements OnInit {

  shippers: Shipper[] = [];

  constructor(private shippersService: ShippersService) { }

  ngOnInit() {
    this.shippersService.getShippers().subscribe(
      {
        next: shippersResult => { this.shippers = shippersResult; }
      }
    );
  }

}
