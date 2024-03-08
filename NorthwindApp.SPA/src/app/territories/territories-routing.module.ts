import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TerritoryListComponent } from './territory-list/territory-list.component';
import { TerritoryEditComponent } from './territory-edit/territory-edit.component';
import { preventUnsavedChangesGuard } from './prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: 'territories', component: TerritoryListComponent},
  { path: 'territories/territory-list', component: TerritoryListComponent},
  { path: 'territories/territory-edit', component: TerritoryEditComponent, canDeactivate: [preventUnsavedChangesGuard]},
  { path: 'territories/territory-edit/:territoryId', component: TerritoryEditComponent, canDeactivate: [preventUnsavedChangesGuard] }
];
// , canDeactivate: [preventUnsavedChangesGuard]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerritoriesRoutingModule { }
