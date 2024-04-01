import { inject } from '@angular/core';
import { CanActivateFn, CanDeactivateFn } from '@angular/router';
import { ConfirmService } from '../_services/confirm.service';

import { TerritoryEditComponent } from '../territories/territory-edit/territory-edit.component';
import { CategoryEditComponent } from '../categories/category-edit/category-edit.component';
import { CustomerEditComponent } from '../customers/customer-edit/customer-edit.component';
import { EmployeeEditComponent } from '../employees/employee-edit/employee-edit.component';
import { OrderEditComponent } from '../orders/order-edit/order-edit.component';
import { ProductEditComponent } from '../products/product-edit/product-edit.component';
import { RegionEditComponent } from '../regions/region-edit/region-edit.component';
import { ShipperEditComponent } from '../shippers/shipper-edit/shipper-edit.component';
import { SupplierDetailComponent } from '../suppliers/supplier-detail/supplier-detail.component';

export const preventUnsavedChangesOnCategoryGuard: CanDeactivateFn<CategoryEditComponent> = (component) => {

  const confirmService = inject(ConfirmService);

  component.throwDirtToControls();

  if(component.categoryForm?.dirty && !component.savingRecord
     ) {
    let confirmationModalData = {
      title: 'Categories',
      message: 'Are you sure you want to leave this category without saving it?',
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    confirmService.confirmationModalData = confirmationModalData;
    return confirmService.confirm();
  }

  return true;
};

export const preventUnsavedChangesOnCustomerGuard: CanDeactivateFn<CustomerEditComponent> = (component) => {

  const confirmService = inject(ConfirmService);

  if(component.customerForm?.dirty && !component.savingRecord) {
    let confirmationModalData = {
      title: 'Customers',
      message: 'Are you sure you want to leave this customer without saving it?',
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    confirmService.confirmationModalData = confirmationModalData;
    return confirmService.confirm();
  }

  return true;
};

export const preventUnsavedChangesOnEmployeeGuard: CanDeactivateFn<EmployeeEditComponent> = (component) => {

  const confirmService = inject(ConfirmService);

  component.throwDirtToControls();

  if(component.employeeForm?.dirty && !component.savingRecord) {
    let confirmationModalData = {
      title: 'Employees',
      message: 'Are you sure you want to leave this employee without saving it?',
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    confirmService.confirmationModalData = confirmationModalData;
    return confirmService.confirm();
  }

  return true;
};

export const preventUnsavedChangesOnOrderGuard: CanDeactivateFn<OrderEditComponent> = (component) => {

  const confirmService = inject(ConfirmService);

  if(component.orderForm?.dirty && !component.savingRecord) {
    let confirmationModalData = {
      title: 'Orders',
      message: 'Are you sure you want to leave this order without saving it?',
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    confirmService.confirmationModalData = confirmationModalData;
    return confirmService.confirm();
  }

  return true;
};

export const preventUnsavedChangesOnProductGuard: CanDeactivateFn<ProductEditComponent> = (component) => {

  const confirmService = inject(ConfirmService);

  if(component.productForm?.dirty && !component.savingRecord) {
    let confirmationModalData = {
      title: 'Product',
      message: 'Are you sure you want to leave this product without saving it?',
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    confirmService.confirmationModalData = confirmationModalData;
    return confirmService.confirm();
  }

  return true;
};

export const preventUnsavedChangesOnRegionGuard: CanDeactivateFn<RegionEditComponent> = (component) => {

  const confirmService = inject(ConfirmService);

  if(component.regionForm?.dirty && !component.savingRecord) {
    let confirmationModalData = {
      title: 'Regions',
      message: 'Are you sure you want to leave this region without saving it?',
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    confirmService.confirmationModalData = confirmationModalData;
    return confirmService.confirm();
  }

  return true;
};

export const preventUnsavedChangesOnShipperGuard: CanDeactivateFn<ShipperEditComponent> = (component) => {

  const confirmService = inject(ConfirmService);

  if(component.shipperForm?.dirty && !component.savingRecord) {
    let confirmationModalData = {
      title: 'Shippers',
      message: 'Are you sure you want to leave this shipper without saving it?',
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    confirmService.confirmationModalData = confirmationModalData;
    return confirmService.confirm();
  }

  return true;
};

export const preventUnsavedChangesOnSupplierGuard: CanDeactivateFn<SupplierDetailComponent> = (component) => {

  const confirmService = inject(ConfirmService);

  if(component.supplierForm?.dirty && !component.savingRecord) {
    let confirmationModalData = {
      title: 'Suppliers',
      message: 'Are you sure you want to leave this supplier without saving it?',
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    confirmService.confirmationModalData = confirmationModalData;
    return confirmService.confirm();
  }

  return true;
};

export const preventUnsavedChangesOnTerritoryGuard: CanDeactivateFn<TerritoryEditComponent> = (component) => {

  const confirmService = inject(ConfirmService);

  if(component.territoryForm?.dirty && !component.savingRecord) {
    let confirmationModalData = {
      title: 'Territories',
      message: 'Are you sure you want to leave this territory without saving it?',
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    confirmService.confirmationModalData = confirmationModalData;
    return confirmService.confirm();
  }

  return true;
};
