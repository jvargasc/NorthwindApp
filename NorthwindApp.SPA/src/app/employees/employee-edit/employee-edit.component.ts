import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { Employee } from 'src/app/_models/employee';
import { ModalMessageData } from 'src/app/_models/modalmessagedata';
import { Region } from 'src/app/_models/region';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { EmployeesService } from 'src/app/_services/employees.service';
import { PhotosService } from 'src/app/_services/photos.service';
import { RegionsService } from 'src/app/_services/regions.service';
import { ShowMessageComponent } from 'src/app/_shared/modals/show-message/show-message.component';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employee: Employee = {} as Employee;
  employeeForm: FormGroup = new FormGroup ({});
  employees: Employee[] = [];
  photo?: string;
  picturePrefix: string = environment.picturePrefix;
  blankPicture: string = environment.blankPicture;
  regions: Region[] = [];
  modalTitle = "Employee";
  modalYesNoBody = "";
  modalMessageBody = "";
  toolbarButtonPressed = "";
  headerToast = "Employee";
  bodyToast = "Record successfully saved!!!";

  savingRecord = false;
  pictureAssigned = false;

  modalRef: BsModalRef;

  constructor(private employeesServices: EmployeesService, private regionsService: RegionsService, private photosService: PhotosService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService, private confirmService: ConfirmService, private modalService: BsModalService) { }

  ngOnInit() {
    this.photosService.setPhoto(this.blankPicture);
    this.initializeForm();
    this.getParameters();
    this.setEmployee();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";
    this.getPicture();
    this.throwDirtToControls();

    switch(buttonName) {
      case "new":
        modalBody = "Do you wish to clear this Employee and create a new one?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Employee?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "return":
        this.router.navigate(['/employees/employee-list']);
        break;
    }
  }

  modalButtonWasClicked(button: string) {
    this.getPicture();
    switch(button) {
      case "btnYes":
        if (this.toolbarButtonPressed == "new")
          this.clearForm();
        if (this.toolbarButtonPressed == "save")
            if(this.requiredFieldsValid())
              this.createOrUpdateEmployee();
            else
              this.savingRecord = false;
      break;
      case "btnNo":
        break;
      }

    this.toolbarButtonPressed = ""
  }
//#endregion

//#region Handle Form
  throwDirtToControls() {

    if (this.photo == undefined)
      return;

    if ((this.photo === this.blankPicture))
      return;

    Object.keys(
      this.employeeForm.controls
    ).forEach((key: string) => {
      if(key != 'employeeId')
        if(!this.employeeForm.controls[key].valid)
          this.employeeForm.controls[key].markAsDirty();
    });

  }

  private untouchControls() {

    Object.keys(
      this.employeeForm.controls
    ).forEach((key: string) => {
      if(key != 'employeeId') {
        if(this.employeeForm.controls[key].touched) {
          this.employeeForm.controls[key].markAsUntouched();
        }
      }
    });

  }

  private initializeForm() {
    this.savingRecord = false;
    this.pictureAssigned = false;
    this.employeeForm = new FormGroup({
      'employeeId' : new FormControl(this.employee?.employeeId, Validators.required),
      'lastName' : new FormControl(this.employee?.lastName, Validators.required),
      'firstName' : new FormControl(this.employee?.firstName, Validators.required),
      'photo' : new FormControl(this.employee?.photo, Validators.required),
      'title' : new FormControl(this.employee?.title, Validators.required),
      'titleOfCourtesy' : new FormControl(this.employee?.titleOfCourtesy, Validators.required),
      'birthDate' : new FormControl(null, Validators.required),
      'hireDate' : new FormControl(null, Validators.required),
      'address' : new FormControl(this.employee?.address, Validators.required),
      'city' : new FormControl(this.employee?.city, Validators.required),
      'regionId' : new FormControl(this.employee?.regionId, Validators.required),
      'postalCode' : new FormControl(this.employee?.postalCode, Validators.required),
      'country' : new FormControl(this.employee?.country, Validators.required),
      'homePhone' : new FormControl(this.employee?.homePhone, Validators.required),
      'extension' : new FormControl(this.employee?.extension, Validators.required),
      'notes' : new FormControl(this.employee?.notes, Validators.required),
      'reportsTo' : new FormControl(this.employee?.reportsTo, Validators.required),
      'reportsToDescription' : new FormControl(this.employee?.reportsTo, Validators.required),
      'photoPath' : new FormControl(this.employee?.photoPath, Validators.required)
    })

    this.employeeForm.controls['employeeId'].disable();
    if(Object.keys(this.employee).length >0) {
      // this.photo = 'data:image/jpg;base64,' + this.employee?.photo;
      this.fillDates();
      this.getReportsTo();
      this.getEmployees();
    }
  }

  private fillDates() {
    this.employeeForm.patchValue({
      birthDate : formatDate(this.getDate(this.employee.birthDate), 'yyyy-MM-dd', 'en'),
      hireDate : formatDate(this.getDate(this.employee.hireDate), 'yyyy-MM-dd', 'en')
    });
  }

  private clearForm() {
    this.savingRecord = false;
    this.photosService.setPhoto(this.blankPicture);
    this.highLightPicture(false);
    this.router.navigate(['/employees/employee-edit']);
    this.employee = {} as Employee;
    this.photo = '';
    this.initializeForm();
    this.setPicture();
  }

  private requiredFieldsValid(): boolean {
    this.savingRecord = true;
    let displayModalMessage = false;

    this.getPicture();

    if(!this.employeeForm.valid) displayModalMessage = true;

    if ((this.photo == this.blankPicture) || this.photo === undefined) {
      displayModalMessage = true;
      this.highLightPicture(true);
    }

    if(displayModalMessage) {
      this.displayModalMessage(
        "There are required fields that you must complete."
      );
    }

    return this.employeeForm.valid;
  }

  private allFieldsEmpty(): boolean {
    let returnValue = true;

    Object.keys(
      this.employeeForm.controls
    ).forEach((key: string) => {
      const controlValue = this.employeeForm.controls[key].value;

      if(controlValue) {

        if(
          (key == 'photo' && (controlValue != this.blankPicture))
                              ||
                        (key != 'photo')
          ) {
          returnValue = false;
          return;
        }

      }

    });

    return returnValue;
  }

  private getParameters() {
    this.getRegions();
    this.getEmployees()
  }

  private getEmployees() {
    this.employeesServices.getEmployees().subscribe(
      {
        next: employeesResult => {
          this.employees = employeesResult ;
        }
      }
    );
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

  private getReportsTo() {
    const reportsTo = this.employee.reportsTo;
    if (reportsTo)
      this.employeesServices.getEmployee(reportsTo).subscribe(
        {
          next: reportsToResult => {
            this.employeeForm.controls['reportsToDescription'].setValue(`${reportsToResult.firstName} ${reportsToResult.lastName}`);
          }
        }
      );
  }

  private getDate(dateValue: Date): Date {
    if(Object.keys(this.employee).length >0)
      return new Date(this.formatDate(dateValue));

    return new Date();
  }

  private formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
    return [month, day, year].join('-');
  }
//#endregion

//#region Handle Employee
  private createOrUpdateEmployee() {
    let employeeId = this.employeeForm.controls['employeeId'].value;

    this.setValuesForEmployee(employeeId);
    if (employeeId == null)
      this.employeesServices.createEmployee(this.employee)
          .subscribe({
            next: employeeResult => {
              this.reloadSavedEmployee(employeeResult);
              this.toastr.success(this.bodyToast);
            },
            error: errorResult => {
              this.displayModalMessage( JSON.stringify(errorResult));
            }
          });
    else
        this.employeesServices.updateEmployee(this.employee)
        .subscribe({
          next: employeeResult => {
            this.reloadSavedEmployee(employeeResult);
            this.toastr.success(this.bodyToast);
          },
            error: errorResult => {
              this.displayModalMessage(JSON.stringify(errorResult));
            }
        });
  }

  private setValuesForEmployee(employeeId: number) {

    this.getPicture();
    if (this.photo != null)
      if (this.photo.length > 0) {
        let prefixPosition = this.photo.includes(this.picturePrefix);
        const newPic = this.photo.substring(
          prefixPosition ? this.picturePrefix.length : 0
        );
        this.employee = {
          lastName: this.employeeForm.controls['lastName'].value,
          firstName: this.employeeForm.controls['firstName'].value,
          title: this.employeeForm.controls['title'].value,
          titleOfCourtesy: this.employeeForm.controls['titleOfCourtesy'].value,
          birthDate: this.employeeForm.controls['birthDate'].value,
          hireDate: this.employeeForm.controls['hireDate'].value,
          address: this.employeeForm.controls['address'].value,
          city: this.employeeForm.controls['city'].value,
          regionId: this.employeeForm.controls['regionId'].value,
          postalCode: this.employeeForm.controls['postalCode'].value,
          country: this.employeeForm.controls['country'].value,
          homePhone: this.employeeForm.controls['homePhone'].value,
          extension: this.employeeForm.controls['extension'].value,
          photo: newPic,
          notes: this.employeeForm.controls['notes'].value,
          reportsTo: this.employeeForm.controls['reportsTo'].value,
          photoPath: this.employeeForm.controls['photoPath'].value
            } as Employee ;
      }

    if (employeeId != null)
      this.employee.employeeId = employeeId;

  }

  private setEmployee() {
    const employeeId = this.route.snapshot.paramMap.get('employeeId');
    if(employeeId)
      this.employeesServices.getEmployee(+employeeId!).subscribe(
        {
          next: employeeResult => {
            this.employee = employeeResult;
            this.initializeForm();
            this.setPicture();
          }
        }
      );
  }

  private reloadSavedEmployee(employee: Employee) {
    if(employee) {
      const employeeId = employee.employeeId;
      this.router.navigate([`/employees/employee-edit/${employeeId}`]);
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
      title: 'Employees',
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
                this.createOrUpdateEmployee();
              break;
          }
        }
    });
  }

  private displayModalMessage(body: string) {

    const modalMessageData: ModalMessageData = {
      title: 'Employees', body: body, button: 'btn-danger'
    }

    this.modalRef = this.modalService.show(ShowMessageComponent, { initialState : { modalMessageData } });
  }
//#endregion

//#region Picture
  private setPicture() {

    if(Object.keys(this.employee).length >0) {
      this.highLightPicture(false);
      this.photo = this.picturePrefix + this.employee?.photo;
    }
    else
      this.photo = this.blankPicture;

    this.photosService.setPhoto(this.photo);
  }

  private getPicture() {
    this.photosService.getPhoto().subscribe({
      next: photoResult => {
        if(photoResult.length > 0) {
          this.photo = photoResult;
          this.employeeForm.controls['photo'].setValue(photoResult);
          this.highLightPicture(false);
        } else {
          this.displayModalMessage("Photo Required");
          this.pictureAssigned = false;
        }
      }
    })

  }

  private highLightPicture(show: boolean) {
    const colPhotoUpload = document.getElementById('col-photo-upload');
    const classesList: string[] = [ 'ng-invalid', 'ng-touched' ];

    if(show) {
      colPhotoUpload.classList.add(...classesList);
    } else {
      colPhotoUpload.classList.remove(...classesList);
    }
  }
//#endregion
}
