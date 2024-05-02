import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionsRoutingModule } from './regions-routing.module';
import { RegionEditComponent } from './region-edit/region-edit.component';
import { RegionListComponent } from './region-list/region-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';

@NgModule({
  declarations: [
    RegionEditComponent,
    RegionListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RegionsRoutingModule
  ]
})
export class RegionsModule { }
