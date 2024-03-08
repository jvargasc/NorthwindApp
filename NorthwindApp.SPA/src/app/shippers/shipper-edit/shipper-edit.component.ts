import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  modalTitle = "Shipper";
  modalYesNoBody = "";
  modalMessageBody = "";
  toolbarButtonPressed = "";
  headerToast = "Shipper";
  bodyToast = "Record successfully saved!!!";
  savingRecord = false;

  constructor(private shippersService: ShippersService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService ) { }

  ngOnInit() {
    this.initializeForm();
    this.SetShipper();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";
    switch(buttonName){
      case "new":
        modalBody = "Do you wish to clear this Customer and create a new one?";
        this.displayModalYesNo(modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Customer?";
        this.displayModalYesNo(modalBody);
        break;
      case "return":
        this.router.navigate(['/shippers/shipper-list']);
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
              this.createOrUpdateShipper();
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
    this.shipperForm = new FormGroup({
      'shipperId' : new FormControl(this.shipper?.shipperId),
      'companyName' : new FormControl(this.shipper?.companyName, Validators.required),
      'phone' : new FormControl(this.shipper?.phone, Validators.required)
    })
    this.shipperForm.controls['shipperId'].disable();
  }

  private clearForm() {
    this.shipper = {} as Shipper;
    this.initializeForm();
    this.router.navigate(['/shippers/shipper-edit']);
  }

  private requiredFieldsValid(): boolean {
    this.savingRecord = true;
    if(!this.shipperForm.valid) {
      this.modalMessageBody = "There are required fields that you must complete.";
      this.displayModalMessage();
    }

    return this.shipperForm.valid;
  }
//#endregion

//#region Handle Shipper
  private createOrUpdateShipper() {
    let shipperId = this.shipperForm.controls['shipperId'].value;
    this.setValuesForShipper(shipperId);
    if (shipperId == null)
      this.shippersService.createShipper(this.shipper)
          .subscribe({
            next: shipperResult => {
              this.reloadSavedShipper(shipperResult);
              this.toastr.success(this.bodyToast);
            },
            error: errorResult => {
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
            }
          });
    else
        this.shippersService.updateShipper(this.shipper)
        .subscribe({
          next: shipperResult => {
            this.reloadSavedShipper(shipperResult);
            this.toastr.success(this.bodyToast);
          },
            error: errorResult => {
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
            }
        });
  }

  private setValuesForShipper(shipperId: number) {

    this.shipper = {
      companyName: this.shipperForm.controls['companyName'].value,
      phone: this.shipperForm.controls['phone'].value,
        } as Shipper ;

    if (shipperId != null)
      this.shipper.shipperId = shipperId;
  }

  private SetShipper() {

    const shipperId = Number(this.route.snapshot.paramMap.get('shipperId'));
    if(shipperId)
      this.shippersService.getShipper(shipperId).subscribe(
        {
          next: shipperResult => {
            this.shipper = shipperResult;
            this.initializeForm();
          }
        }
      );
  }

  private reloadSavedShipper(shipper: Shipper) {
    if(shipper) {
      const shipperId = shipper.shipperId;
      this.router.navigate([`/shippers/shipper-edit/${shipperId}`]);
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

  private toastClick() {
    const btnToast = document.getElementById("liveToastBtn");
    if(btnToast) {
      btnToast.click();
      // btnToast.click();
    }
  }
//#endregion

}
