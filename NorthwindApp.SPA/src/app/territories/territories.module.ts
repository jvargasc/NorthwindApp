import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerritoriesRoutingModule } from './territories-routing.module';
import { TerritoryEditComponent } from './territory-edit/territory-edit.component';
import { TerritoryListComponent } from './territory-list/territory-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [
    TerritoryEditComponent,
    TerritoryListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TerritoriesRoutingModule
  ]
})
export class TerritoriesModule { }
