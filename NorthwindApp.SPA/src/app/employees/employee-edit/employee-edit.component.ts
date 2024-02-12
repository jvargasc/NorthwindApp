import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from 'src/app/_models/employee';
import { Region } from 'src/app/_models/region';
import { EmployeesService } from 'src/app/_services/employees.service';
import { PhotosService } from 'src/app/_services/photos.service';
import { RegionsService } from 'src/app/_services/regions.service';

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
  pictureSufix: string = "data:image/jpg;base64,";
  blankPicture = '../../../assets/images/Blank.png';
  regions: Region[] = [];
  modalTitle = "Employee";
  modalYesNoBody = "";
  modalMessageBody = "";
  toolbarButtonPressed = "";
  headerToast = "Employee";
  bodyToast = "Record successfully saved!!!";

  @ViewChild('lastName') lastName: ElementRef;
  @ViewChild('firstName') firstName: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('titleOfCourtesy') titleOfCourtesy: ElementRef;
  @ViewChild('birthDate') birthDate: ElementRef;
  @ViewChild('hireDate') hireDate: ElementRef;
  @ViewChild('address') address: ElementRef;
  @ViewChild('city') city: ElementRef;
  @ViewChild('regionId') regionId: ElementRef;
  @ViewChild('postalCode') postalCode: ElementRef;
  @ViewChild('country') country: ElementRef;
  @ViewChild('homePhone') homePhone: ElementRef;
  @ViewChild('extension') extension: ElementRef;
  @ViewChild('regiondId') regiondId: ElementRef;
  // @ViewChild('photo') photo: ElementRef;
  @ViewChild('notes') notes: ElementRef;
  @ViewChild('reportsTo') reportsTo: ElementRef;
  @ViewChild('photoPath') photoPath: ElementRef;

  constructor(private employeesServices: EmployeesService, private regionsService: RegionsService, private photosService: PhotosService,
    private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
    this.initializeForm();
    this.getParameters();
    this.SetEmployee();
    this.toastClick();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";
    switch(buttonName) {
      case "new":
        modalBody = "Do you wish to clear this Employee and create a new one?";
        this.displayModalYesNo(modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Employee?";
        this.displayModalYesNo(modalBody);
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
      break;
      case "btnNo":
        break;
      }

    this.toolbarButtonPressed = ""
  }
//#endregion

//#region Handle Form
  private initializeForm() {
    this.employeeForm = new FormGroup({
      'employeeId' : new FormControl(this.employee?.employeeId),
      'lastName' : new FormControl(this.employee?.lastName),
      'firstName' : new FormControl(this.employee?.firstName),
      'photo' : new FormControl(this.employee?.photo),
      'title' : new FormControl(this.employee?.title),
      'titleOfCourtesy' : new FormControl(this.employee?.titleOfCourtesy),
      'birthDate' : new FormControl(formatDate( this.getDate(this.employee?.birthDate), 'yyyy-MM-dd', 'en')),
      'hireDate' : new FormControl(formatDate( this.getDate(this.employee?.hireDate), 'yyyy-MM-dd', 'en')),
      'address' : new FormControl(this.employee?.address),
      'city' : new FormControl(this.employee?.city),
      'regionId' : new FormControl(this.employee?.regionId),
      'postalCode' : new FormControl(this.employee?.postalCode),
      'country' : new FormControl(this.employee?.country),
      'homePhone' : new FormControl(this.employee?.homePhone),
      'extension' : new FormControl(this.employee?.extension),
      'notes' : new FormControl(this.employee?.notes),
      'reportsTo' : new FormControl(this.employee?.reportsTo),
      'reportsToDescription' : new FormControl(this.employee?.reportsTo),
      'photoPath' : new FormControl(this.employee?.photoPath)
    })

    this.employeeForm.controls['employeeId'].disable();
    if(Object.keys(this.employee).length >0) {
      this.photo = 'data:image/jpg;base64,' + this.employee?.photo;
      this.getReportsTo();
      this.getEmployees();
    }
  }

  private clearForm() {
    this.highLightPicture(false);
    this.router.navigate(['/employees/employee-edit']);
    this.employee = {} as Employee;
    this.photo = '';
    this.initializeForm();
    this.setPicture();
  }

  private requiredFieldsValid(): boolean {
    let tmpValue = false;
    let displayModalMessage = false;

    if(!this.employeeForm.valid) {
      for (const field in this.employeeForm.controls) { // 'field' is a string
        const tmpControl = this.employeeForm.get(field); // 'control' is a FormControl
        if(tmpControl.invalid) {
          switch(field) {
            case "title":
              this.title.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "titleOfCourtesy":
              this.titleOfCourtesy.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "lastName":
              this.lastName.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "firstName":
              this.firstName.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "birthDate":
              this.birthDate.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "hireDate":
              this.hireDate.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "address":
              this.address.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "city":
              this.city.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "regionId":
              this.regionId.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "postalCode":
              this.postalCode.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "country":
              this.country.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "homePhone":
              this.homePhone.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "extension":
              this.extension.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "regiondId":
              this.regiondId.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "notes":
              this.notes.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "reportsTo":
              this.reportsTo.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "photoPath":
              this.photoPath.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            }
          }
        }

     }

    if ((this.photo == this.blankPicture) || this.photo === undefined) {
      displayModalMessage = true;
      this.highLightPicture(true);
    }

    if(displayModalMessage) {
      this.modalMessageBody = "There are required fields that you must complete.";
      this.displayModalMessage();
    }

    return !displayModalMessage;
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
    return [day, month, year].join('-');
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
              this.toastClick();
            },
            error: errorResult => {
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
            }
          });
    else
        this.employeesServices.updateEmployee(this.employee)
        .subscribe({
          next: employeeResult => {
            this.reloadSavedEmployee(employeeResult);
            this.toastClick();
          },
            error: errorResult => {
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
            }
        });
  }

  private setValuesForEmployee(employeeId: number) {

    this.getPicture();
    if (this.photo != null)
      if (this.photo.length > 0) {
        const newPic = this.photo.replace(this.pictureSufix, "");
        this.employee = {
            lastName: this.employeeForm.controls['lastName'].value,
            firstName: this.employeeForm.controls['firstName'].value,
            photo: newPic
              } as Employee ;
      }

    if (employeeId != null)
      this.employee.employeeId = employeeId;

  }

  private SetEmployee() {
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

//#region Modals and Toasts
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
    if(btnToast)
      btnToast.click();
  }
//#endregion

//#region Picture
  private setPicture() {

    if(Object.keys(this.employee).length >0) {
      this.highLightPicture(false);
      this.photo = this.pictureSufix + this.employee?.photo;
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
        } else
            this.displayModalMessage();
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
