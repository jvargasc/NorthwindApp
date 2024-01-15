import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from './_shared/shared.module';
import { ShippersModule } from './shippers/shippers.module';
import { ToolbarsModule } from './_shared/toolbars/toolbars.module';
import { CustomersModule } from './customers/customers.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ToolbarsModule,
    CustomersModule,
    ShippersModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
