import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
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
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';

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
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
