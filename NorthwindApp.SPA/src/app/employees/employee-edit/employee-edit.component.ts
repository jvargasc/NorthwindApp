import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Employee } from 'src/app/_models/employee';
import { Region } from 'src/app/_models/region';
import { EmployeesService } from 'src/app/_services/employees.service';
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
  regions: Region[] = [];
  modalTitle: string = "modal Title!!";
  modalBody: string = "modal Body!!";

  constructor(private employeesServices: EmployeesService, private route: ActivatedRoute, private regionsService: RegionsService,
    private router: Router ) { }

  ngOnInit() {
    this.initializeForm();
    this.getParameters();
    this.SetEmployee();
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
        this.router.navigate(['/employees/employee-list']);
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

  private getParameters() {
    this.getRegions();
    this.getEmployees()
  }

  private displayYesNoModal() {
    const btnShowModal = document.getElementById("showModal");
    if(btnShowModal)
      btnShowModal.click();
  }

  private clearForm() {
    this.employee = {} as Employee;
    this.initializeForm();
    this.router.navigate(['/employees/employee-edit']);
  }

  private SetEmployee() {
    const employeeId = this.route.snapshot.paramMap.get('employeeId');
    if(employeeId)
      this.employeesServices.getEmployee(+employeeId!).subscribe(
        {
          next: employeeResult => {
            this.employee = employeeResult;
            this.initializeForm();
          }
        }
      );
  }

  private initializeForm() {
    this.employeeForm = new FormGroup({
      'employeeId' : new FormControl(this.employee?.employeeId),
      'lastName' : new FormControl(this.employee?.lastName),
      'firstName' : new FormControl(this.employee?.firstName),
      'photo' : new FormControl(this.employee?.photo),
      'title' : new FormControl(this.employee?.title),
      'titleOfCourtesy' : new FormControl(this.employee?.titleOfCourtesy),
      'birthDate' : new FormControl(this.employee?.birthDate),
      'hireDate' : new FormControl(this.employee?.hireDate),
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

}
