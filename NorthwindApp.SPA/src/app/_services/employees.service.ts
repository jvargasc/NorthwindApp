import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
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

  constructor(private http: HttpClient) {
    this.setEmployees();
    const timeLapse = (1 * 60 * 1000); // minutes * seconds * miliseconds
    interval(timeLapse).subscribe(
      t => (this.setEmployees())
      );
   }

  getEmployees() {
    return this.http.get<Employee[]>(this.baseUrl + `getemployees`);
  }

  getEmployee(employeeId: number) {
    return this.http.get<Employee>(this.baseUrl + `getemployee/${employeeId}`);
  }

  private setEmployees() {
    this.getEmployees().subscribe({
      next: employeessResult => {
        this.employeesSource.next(employeessResult);
      }
    });
  }

}
