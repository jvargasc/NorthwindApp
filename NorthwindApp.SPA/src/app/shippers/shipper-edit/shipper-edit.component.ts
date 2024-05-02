import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ModalMessageData } from 'src/app/_models/modalmessagedata';

import { Shipper } from 'src/app/_models/shipper';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { ShippersService } from 'src/app/_services/shippers.service';
import { ShowMessageComponent } from 'src/app/_shared/modals/show-message/show-message.component';

@Component({
  selector: 'app-shipper-edit',
  templateUrl: './shipper-edit.component.html',
  styleUrls: ['./shipper-edit.component.css']
})
export class ShipperEditComponent implements OnInit {
  shipper?: Shipper;
  shipperForm: FormGroup = new FormGroup({});
  toolbarButtonPressed = "";
  bodyToast = "Record successfully saved!!!";
  savingRecord = false;

  modalRef: BsModalRef;

  constructor(private shippersService: ShippersService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private confirmService: ConfirmService, private modalService: BsModalService ) { }

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
        modalBody = "Do you wish to clear this Shipper and create a new one?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Shipper?";
        this.displayModalYesNo(buttonName, modalBody);
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
            else
              this.savingRecord = false;
        }
      break;
      case "btnNo":
        break;
      }

    this.toolbarButtonPressed = ""
  }
//#endregion

//#region Handle Form
  private untouchControls() {

    Object.keys(
      this.shipperForm.controls
    ).forEach((key: string) => {
      if(key != 'customerId') {
        if(this.shipperForm.controls[key].touched) {
          this.shipperForm.controls[key].markAsUntouched();
        }
      }
    });

  }

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
    this.router.navigate(['/shippers/shipper-edit']);
    this.shipper = {} as Shipper;
    this.initializeForm();
  }

  private requiredFieldsValid(): boolean {
    this.savingRecord = true;
    if(!this.shipperForm.valid) {
      this.displayModalMessage(
        "There are required fields that you must complete."
      );
    }

    return this.shipperForm.valid;
  }

  private allFieldsEmpty(): boolean {
    let returnValue = true;

    Object.keys(
      this.shipperForm.controls
    ).forEach((key: string) => {
      if(this.shipperForm.controls[key].value) {
        returnValue = false;
        return;
      }
    });

    return returnValue;
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
              this.displayModalMessage(
              JSON.stringify(errorResult)
              );
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
              this.displayModalMessage(
                              JSON.stringify(errorResult)
              );
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
  private displayModalYesNo(buttonName: string, modalBody: string) {

    if(buttonName == 'new' && this.allFieldsEmpty()) {
      this.untouchControls();
      return;
    }

    let confirmationModalData = {
      title: 'Customers',
      message: modalBody,
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    this.confirmService.confirmationModalData = confirmationModalData;

    this.confirmService.confirm().subscribe({
      next: buttonPressed => {
        if (buttonPressed)
          switch(buttonName) {
            case "new":
              this.clearForm();
              break;
            case "save":
              if(this.requiredFieldsValid())
                this.createOrUpdateShipper();
              break;
          }
        }
    });
  }

  private displayModalMessage(body: string) {

    const modalMessageData: ModalMessageData = {
      title: 'Shippers', body: body, button: 'btn-danger'
    }

    this.modalRef = this.modalService.show(ShowMessageComponent, { initialState : { modalMessageData } });
  }
//#endregion

}
