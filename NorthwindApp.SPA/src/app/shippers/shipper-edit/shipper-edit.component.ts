import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
  modalTitle: string = "modal Title!!";
  modalBody: string = "modal Body!!";

  constructor(private shippersService: ShippersService, private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.initializeForm();
    this.SetShipper();
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
        this.router.navigate(['/shippers/shipper-list']);
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

  private displayYesNoModal() {
    const btnShowModal = document.getElementById("showModal");
    if(btnShowModal)
      btnShowModal.click();
  }

  private clearForm() {
    this.shipper = {} as Shipper;
    this.initializeForm();
    this.router.navigate(['/shippers/shipper-edit']);
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
