import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { ToolbarsModule } from './toolbars/toolbars.module';
import { ToolbarCrudComponent } from './toolbars/toolbarcrud/toolbarcrud.component';
import { ToolbarlistComponent } from './toolbars/toolbarlist/toolbarlist.component';
import { ModalyesnoComponent } from './modals/modalyesno/modalyesno.component';
import { ModalsearchComponent } from './modals/modalsearch/modalsearch.component';
import { RouterLink } from '@angular/router';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    ModalyesnoComponent,
    ModalsearchComponent,
    PhotoUploadComponent
  ],
  imports: [
    CommonModule,
    ToolbarsModule,
    RouterLink,
    ReactiveFormsModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    ToolbarCrudComponent,
    ToolbarlistComponent,
    ModalyesnoComponent,
    ModalsearchComponent,
    PhotoUploadComponent
  ],
})
export class SharedModule { }
