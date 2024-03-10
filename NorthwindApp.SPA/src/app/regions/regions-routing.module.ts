import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegionListComponent } from './region-list/region-list.component';
import { RegionEditComponent } from './region-edit/region-edit.component';
import { preventUnsavedChangesOnRegionGuard } from '../_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: 'regions', component: RegionListComponent},
  { path: 'regions/region-list', component: RegionListComponent},
  { path: 'regions/region-edit', component: RegionEditComponent, canDeactivate: [preventUnsavedChangesOnRegionGuard] },
  { path: 'regions/region-edit/:regionId', component: RegionEditComponent, canDeactivate: [preventUnsavedChangesOnRegionGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsRoutingModule { }
