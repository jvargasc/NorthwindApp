import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionListComponent } from './region-list/region-list.component';
import { RegionEditComponent } from './region-edit/region-edit.component';

const routes: Routes = [
  { path: 'regions', component: RegionListComponent},
  { path: 'regions/region-list', component: RegionListComponent},
  { path: 'regions/region-edit/:categoryId', component: RegionEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsRoutingModule { }
