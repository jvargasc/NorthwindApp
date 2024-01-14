import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Shipper } from 'src/app/_models/shipper';
import { ShippersService } from 'src/app/_services/shippers.service';

@Component({
  selector: 'app-shipper-edit',
  templateUrl: './shipper-edit.component.html',
  styleUrls: ['./shipper-edit.component.css']
})
export class ShipperEditComponent implements OnInit {
  shipper?: Shipper;
  shipperForm: FormGroup = new FormGroup({});

  constructor(private shippersService: ShippersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeForm();
    this.SetShipper();
  }

  private SetShipper() {

    const shipperId = Number(this.route.snapshot.paramMap.get('shipperId'));

    this.shippersService.getShipper(shipperId).subscribe(
      {
        next: shipperResult => {
          this.shipper = shipperResult;
          this.initializeForm();
        }
      }
    );
  }

  private initializeForm() {
      this.shipperForm = new FormGroup({
        'shipperId' : new FormControl(this.shipper?.shipperId, []),
        'companyName' : new FormControl(this.shipper?.companyName, []),
        'phone' : new FormControl(this.shipper?.phone, [])
      })
      this.shipperForm.controls['shipperId'].disable();
  }

}
