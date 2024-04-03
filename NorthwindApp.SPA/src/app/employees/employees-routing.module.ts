import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { preventUnsavedChangesOnEmployeeGuard } from '../_guards/prevent-unsaved-changes.guard';
import { AuthGuard } from '../_guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'employees', component: EmployeeListComponent},
      { path: 'employees/employee-list', component: EmployeeListComponent},
      { path: 'employees/employee-list', component: EmployeeListComponent},
      { path: 'employees/employee-edit', component: EmployeeEditComponent, canDeactivate: [preventUnsavedChangesOnEmployeeGuard]},
      { path: 'employees/employee-edit/:employeeId', component: EmployeeEditComponent, canDeactivate: [preventUnsavedChangesOnEmployeeGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
