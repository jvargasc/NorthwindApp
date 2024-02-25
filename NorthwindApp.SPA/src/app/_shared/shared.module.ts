import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { ToolbarsModule } from './toolbars/toolbars.module';
import { ToolbarCrudComponent } from './toolbars/toolbarcrud/toolbarcrud.component';
import { ToolbarlistComponent } from './toolbars/toolbarlist/toolbarlist.component';
import { ModalYesNoComponent } from './modals/modalyesno/modalyesno.component';
import { ModalSearchComponent } from './modals/modalsearch/modalsearch.component';
import { ModalMessageComponent } from './modals/modalmessage/modalmessage.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    ModalYesNoComponent,
    ModalSearchComponent,
    ModalMessageComponent,
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
    ModalYesNoComponent,
    ModalSearchComponent,
    ModalMessageComponent,
    PhotoUploadComponent
  ],
})
export class SharedModule { }
