import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';

import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { ToolbarsModule } from './toolbars/toolbars.module';
import { ToolbarCrudComponent } from './toolbars/toolbarcrud/toolbarcrud.component';
import { ToolbarlistComponent } from './toolbars/toolbarlist/toolbarlist.component';
import { ModalYesNoComponent } from './modals/modalyesno/modalyesno.component';
import { ModalSearchComponent } from './modals/modalsearch/modalsearch.component';
import { ModalMessageComponent } from './modals/modalmessage/modalmessage.component';
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    ModalYesNoComponent,
    ModalSearchComponent,
    ModalMessageComponent,
    PhotoUploadComponent,
    ConfirmDialogComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ToolbarsModule,
    RouterLink,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    NgxSpinnerModule.forRoot({
      type: 'line-scale-party'
    }),
    ModalModule.forRoot(),
    PaginationModule.forRoot()
  ],
  exports: [
    FormsModule,
    NavComponent,
    FooterComponent,
    ToolbarCrudComponent,
    ToolbarlistComponent,
    ModalYesNoComponent,
    ModalSearchComponent,
    ModalMessageComponent,
    PhotoUploadComponent,
    ToastrModule,
    NgxSpinnerModule,
    ConfirmDialogComponent,
    ModalModule,
    PaginationModule
  ],
})
export class SharedModule { }
