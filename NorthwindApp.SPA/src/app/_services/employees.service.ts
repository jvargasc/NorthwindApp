import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { Employee } from '../_models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private baseUrl = environment.apiUrl + '/api/Employees/';
  private employeesSource = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSource.asObservable();

  constructor(private http: HttpClient) { }

  getEmployees() {
return this.http.get<Employee[]>(this.baseUrl + `getemployees`);
  }

  getEmployee(employeeId: number) {
return this.http.get<Employee>(this.baseUrl + `getemployee/${employeeId}`);
  }

}
