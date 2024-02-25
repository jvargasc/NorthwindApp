import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomersModule } from './customers/customers.module';
import { ShippersModule } from './shippers/shippers.module';
import { SharedModule } from './_shared/shared.module';
import { HomeComponent } from './home/home.component';
import { CategoriesModule } from './categories/categories.module';
import { EmployeesModule } from './employees/employees.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { RegionsModule } from './regions/regions.module';
import { SuppliersModule } from './suppliers/suppliers.module';
import { TerritoriesModule } from './territories/territories.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CategoriesModule,
    CustomersModule,
    EmployeesModule,
    OrdersModule,
    ProductsModule,
    RegionsModule,
    ShippersModule,
    SuppliersModule,
    TerritoriesModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
