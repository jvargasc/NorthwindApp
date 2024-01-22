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

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    ModalyesnoComponent,
    ModalsearchComponent
  ],
  imports: [
    CommonModule,
    ToolbarsModule,
    RouterLink
  ],
  exports: [
    NavComponent,
    FooterComponent,
    ToolbarCrudComponent,
    ToolbarlistComponent,
    ModalyesnoComponent,
    ModalsearchComponent
  ],
})
export class SharedModule { }
