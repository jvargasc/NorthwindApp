import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Employee } from 'src/app/_models/employee';
import { Region } from 'src/app/_models/region';
import { EmployeesService } from 'src/app/_services/employees.service';
import { RegionsService } from 'src/app/_services/regions.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: Employee[] = [];
  regions: Region[] = [];

  constructor(private employeesService: EmployeesService,
    private regionsService: RegionsService, private router: Router) { }

  ngOnInit() {
    this.getEmployees();
    this.getRegions();
  }

  buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
            case "new":
        this.router.navigate(['/employees/employee-edit']);
        break;
      case "refresh":
        location.reload();
        break;
      case "search":
        console.log(buttonName);
        break;
    }
  }

  getRegion(regionId: number) : string | undefined {
    return this.regions.find(r => r.regionId == regionId)?.regionDescription;
  }

  getReportsTo(employeeId: number) : string | undefined {
    const reportsTo = this.employees.find(e => e.employeeId === employeeId);
    return reportsTo ? reportsTo.firstName + ` ` + reportsTo.lastName : undefined;
  }

  private getRegions() {
    this.regionsService.getRegions().subscribe(
      {
        next: regionsResult => { this.regions = regionsResult; }
      }
    );
  }

  private getEmployees() {
    this.employeesService.getEmployees().subscribe(
      {
        next: employeesResult => { this.employees = employeesResult; }
      }
    );
  }
}
