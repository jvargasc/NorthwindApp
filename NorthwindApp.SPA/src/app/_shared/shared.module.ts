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
import { PhotoUploadComponent } from './photo-upload/photo-upload.component';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ShowMessageComponent } from './modals/show-message/show-message.component';
import { SignupLoginComponent } from './modals/signup-login/signup-login.component';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    PhotoUploadComponent,
    ConfirmDialogComponent,
    ShowMessageComponent,
    SignupLoginComponent
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
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot()
  ],
  exports: [
    FormsModule,
    NavComponent,
    FooterComponent,
    ToolbarCrudComponent,
    ToolbarlistComponent,
    PhotoUploadComponent,
    ToastrModule,
    NgxSpinnerModule,
    ConfirmDialogComponent,
    ModalModule,
    PaginationModule,
    BsDropdownModule
  ],
})
export class SharedModule { }
