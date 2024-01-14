import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';
import { ToolbarsModule } from './toolbars/toolbars.module';
import { ToolbarCrudComponent } from './toolbars/toolbarcrud/toolbarcrud.component';
import { ToolbarlistComponent } from './toolbars/toolbarlist/toolbarlist.component';

@NgModule({
  declarations: [
    NavComponent,
    FooterComponent,
    ToolbarCrudComponent,
    ToolbarlistComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NavComponent,
    FooterComponent,
    ToolbarCrudComponent,
    ToolbarlistComponent
  ],
})
export class SharedModule { }
