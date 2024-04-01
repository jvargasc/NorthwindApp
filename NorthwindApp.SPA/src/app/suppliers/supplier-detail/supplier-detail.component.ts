import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { ModalMessageData } from 'src/app/_models/modalmessagedata';

import { Region } from 'src/app/_models/region';
import { Supplier } from 'src/app/_models/supplier';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { RegionsService } from 'src/app/_services/regions.service';
import { SuppliersService } from 'src/app/_services/suppliers.service';
import { ShowMessageComponent } from 'src/app/_shared/modals/show-message/show-message.component';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.css']
})
export class SupplierDetailComponent implements OnInit {

  supplier?: Supplier;
  supplierForm: FormGroup = new FormGroup({});
  regions: Region[] = [];
  modalTitle = "Customer";
  modalYesNoBody = "";
  modalMessageBody = "";
  toolbarButtonPressed = "";
  headerToast = "Customer";
  bodyToast = "Record successfully saved!!!";
  savingRecord = false;

  modalRef: BsModalRef;

  constructor( private suppliersService: SuppliersService, private regionsService: RegionsService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private confirmService: ConfirmService, private modalService: BsModalService ) { }

  ngOnInit() {
    this.getParameters();
    this.initializeForm();
    this.setSupplier();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";

    switch(buttonName){
      case "new":
        modalBody = "Do you wish to clear this Supplier and create a new one?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Supplier?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "return":
        this.router.navigate(['/suppliers/supplier-list']);
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
              this.createOrUpdateSupplier();
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
      this.supplierForm.controls
    ).forEach((key: string) => {
      if(key != 'customerId') {
        if(this.supplierForm.controls[key].touched) {
          this.supplierForm.controls[key].markAsUntouched();
        }
      }
    });

  }

  private initializeForm() {
    this.savingRecord = false;
    this.supplierForm = new FormGroup({
      'supplierId' : new FormControl(this.supplier?.supplierId),
      'companyName' : new FormControl(this.supplier?.companyName, Validators.required),
      'contactName' : new FormControl(this.supplier?.contactName, Validators.required),
      'contactTitle' : new FormControl(this.supplier?.contactTitle, Validators.required),
      'address' : new FormControl(this.supplier?.address, Validators.required),
      'city' : new FormControl(this.supplier?.city, Validators.required),
      'regionId' : new FormControl(this.supplier?.regionId, Validators.required),
      'postalCode' : new FormControl(this.supplier?.postalCode, Validators.required),
      'country' : new FormControl(this.supplier?.country, Validators.required),
      'phone' : new FormControl(this.supplier?.phone, Validators.required),
      'fax' : new FormControl(this.supplier?.fax),
      'homePage' : new FormControl(this.supplier?.homePage)
    });

    this.supplierForm.controls['supplierId'].disable();
  }

  private clearForm() {
    this.savingRecord = false;
    this.router.navigate(['/suppliers/supplier-edit']);
    this.supplier = {} as Supplier;
    this.initializeForm();
  }

  private requiredFieldsValid(): boolean {
    this.savingRecord = true;
    if(!this.supplierForm.valid) {
      this.displayModalMessage(
        "There are required fields that you must complete."
      );
    }

    return this.supplierForm.valid;
  }

  private allFieldsEmpty(): boolean {
    let returnValue = true;

    Object.keys(
      this.supplierForm.controls
    ).forEach((key: string) => {
      if(this.supplierForm.controls[key].value) {
        returnValue = false;
        return;
      }
    });

    return returnValue;
  }

  private getParameters() {
    this.regionsService.getRegions().subscribe(
      {
        next: regionsResult => {
          this.regions = regionsResult;
        }
      }
    );
  }
//#endregion

//#region Handle Supplier
  private createOrUpdateSupplier() {
    let supplierId = this.supplierForm.controls['supplierId'].value;
    this.setValuesForSupplier(supplierId);
    if (supplierId == null)
      this.suppliersService.createSupplier(this.supplier)
          .subscribe({
            next: supplierResult => {
              this.reloadSavedSupplier(supplierResult);
              this.toastr.success(this.bodyToast);
            },
            error: errorResult => {
              this.displayModalMessage(
                JSON.stringify(errorResult)
              );
            }
          });
    else
        this.suppliersService.updateSupplier(this.supplier)
        .subscribe({
          next: supplierResult => {
            this.reloadSavedSupplier(supplierResult);
            this.toastr.success(this.bodyToast);
          },
            error: errorResult => {
              this.displayModalMessage(
                JSON.stringify(errorResult)
              );
            }
        });
  }

  private setValuesForSupplier(supplierId: string) {

    this.supplier = {
      companyName: this.supplierForm.controls['companyName'].value,
      contactName: this.supplierForm.controls['contactName'].value,
      contactTitle: this.supplierForm.controls['contactTitle'].value,
      address: this.supplierForm.controls['address'].value,
      city: this.supplierForm.controls['city'].value,
      regionId: this.supplierForm.controls['regionId'].value,
      postalCode: this.supplierForm.controls['postalCode'].value,
      country: this.supplierForm.controls['country'].value,
      phone: this.supplierForm.controls['phone'].value,
      fax: this.supplierForm.controls['fax'].value
        } as Supplier ;

    if (supplierId != null)
      this.supplier.supplierId = +supplierId;
  }

  private setSupplier() {
    const supplierId = Number(this.route.snapshot.paramMap.get('supplierId'));
    if(supplierId)
    this.suppliersService.getSupplier(+supplierId).subscribe(
      {
        next: supplierResult => {
          this.supplier = supplierResult;
          this.initializeForm();
        }
      }
    );
  }

  private reloadSavedSupplier(supplier: Supplier) {
    if(supplier) {
      const supplierId = supplier.supplierId;
      if (supplierId)
        this.router.navigate([`/suppliers/supplier-edit/${supplierId}`]);
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
                this.createOrUpdateSupplier();
              break;
          }
        }
    });
  }

  private displayModalMessage(body: string) {

    const modalMessageData: ModalMessageData = {
      title: 'Suppliers', body: body, button: 'btn-danger'
    }

    this.modalRef = this.modalService.show(ShowMessageComponent, { initialState : { modalMessageData } });
  }
//#endregion

}
