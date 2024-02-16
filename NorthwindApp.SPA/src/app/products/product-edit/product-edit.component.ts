import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from 'src/app/_models/category';
import { Product } from 'src/app/_models/product';
import { Supplier } from 'src/app/_models/supplier';
import { CategoriesService } from 'src/app/_services/categories.service';
import { ProductsService } from 'src/app/_services/products.service';
import { SuppliersService } from 'src/app/_services/suppliers.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = {} as Product;
  productForm: FormGroup = new FormGroup({});
  modalTitle = "Product";
  modalYesNoBody = "";
  modalMessageBody = "";
  toolbarButtonPressed = "";
  categories: Category[] = [];
  suppliers: Supplier[] = [];
  headerToast = "Product";
  bodyToast = "Record successfully saved!!!";

  @ViewChild('productId') productId: ElementRef;
  @ViewChild('productName') productName: ElementRef;
  @ViewChild('supplierId') supplierId: ElementRef;
  @ViewChild('categoryId') categoryId: ElementRef;
  @ViewChild('quantityPerUnit') quantityPerUnit: ElementRef;
  @ViewChild('unitPrice') unitPrice: ElementRef;
  @ViewChild('unitsInStock') unitsInStock: ElementRef;
  @ViewChild('unitsOnOrder') unitsOnOrder: ElementRef;
  @ViewChild('reorderLevel') reorderLevel: ElementRef;
  @ViewChild('discontinued') discontinued: ElementRef;

  constructor( private productsService: ProductsService, private categoriesservice: CategoriesService, private suppliersservice: SuppliersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getParameters();
    this.initializeForm();
    this.setProduct();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";
    switch(buttonName){
      case "new":
        modalBody = "Do you wish to clear this Product and create a new one?";
        this.displayModalYesNo(modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Product?";
        this.displayModalYesNo(modalBody);
        break;
      case "return":
        this.router.navigate(['/products/product-list']);
        break;
    }
  }

  modalButtonWasClicked(button: string) {
    switch(button) {
      case "btnYes":
        if (this.toolbarButtonPressed == "new")
          this.clearForm();
        if (this.toolbarButtonPressed == "save") {
            if(this.requiredFieldsValid())
              this.createOrUpdateProduct();
        }
      break;
      case "btnNo":
        break;
      }

    this.toolbarButtonPressed = ""
  }
//#endregion

//#region Handle Form
  private initializeForm() {
    this.productForm = new FormGroup({
      'productId': new FormControl(this.product.productId),
      'productName': new FormControl(this.product.productName),
      'supplierId': new FormControl(this.product.supplierId),
      'categoryId': new FormControl(this.product.categoryId),
      'quantityPerUnit': new FormControl(this.product.quantityPerUnit),
      'unitPrice': new FormControl(this.product.unitPrice),
      'unitsInStock': new FormControl(this.product.unitsInStock),
      'unitsOnOrder': new FormControl(this.product.unitsOnOrder),
      'reorderLevel': new FormControl(this.product.reorderLevel),
      'discontinued': new FormControl(this.product.discontinued)
    });

    this.productForm.controls['productId'].disable();
  }

  private clearForm() {
    this.product = {} as Product;
    this.initializeForm();
    this.router.navigate(['/products/product-edit']);
  }

  private requiredFieldsValid(): boolean {
    let displayModalMessage = false;
    if(!this.productForm.valid) {
      for (const field in this.productForm.controls) { // 'field' is a string
        const tmpControl = this.productForm.get(field); // 'control' is a FormControl
        if(tmpControl.invalid) {
          switch(field) {
            case "productName":
              this.productName.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "supplierId":
              this.supplierId.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "categoryId":
              this.categoryId.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "quantityPerUnit":
              this.quantityPerUnit.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "unitPrice":
              this.unitPrice.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "unitsInStock":
              this.unitsInStock.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "unitsOnOrder":
              this.unitsOnOrder.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "reorderLevel":
              this.reorderLevel.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "discontinued":
              this.discontinued.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            }
          }
        }

     }

    if(displayModalMessage) {
      this.modalMessageBody = "There are required fields that you must complete.";
      this.displayModalMessage();
    }

    return !displayModalMessage;
  }

  private getParameters() {
    this.getSuppliers();
    this.getCategories();
  }

  private getSuppliers() {
    this.suppliersservice.getSuppliers().subscribe(
      {
        next: suppliersResult => { this.suppliers = suppliersResult; }
      }
    );
  }

  private getCategories() {
    this.categoriesservice.getCategories().subscribe(
      {
        next: categoriesResult => { this.categories = categoriesResult; }
      }
    );
  }

  private getSupplier(supplierId: number)  : string | undefined {
    const supplier = this.suppliers.find(r => r.supplierId === supplierId);
    return supplier ? supplier.companyName : undefined;
  }

  private getCategory(categoryId: number)  : string | undefined {
    const category = this.categories.find(r => r.categoryId === categoryId);
    return category ? category.categoryName : undefined;
  }

//#endregion

//#region Handle Product
  private createOrUpdateProduct() {
    let productId = this.productForm.controls['productId'].value;

    this.setValuesForProduct(productId);
    if (productId == null){
      this.productsService.createProduct(this.product)
          .subscribe({
            next: productResult => {
              this.reloadSavedProduct(productResult);
              this.toastClick();
            },
            error: errorResult => {
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
            }
          });}
    else
        this.productsService.updateProduct(this.product)
        .subscribe({
          next: productResult => {
            this.reloadSavedProduct(productResult);
            this.toastClick();
          },
            error: errorResult => {
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
            }
        });
  }

  private setValuesForProduct(productId: number) {

    this.product = {
        productName: this.productForm.controls['productName'].value,
        supplierId: this.productForm.controls['supplierId'].value,
        categoryId: this.productForm.controls['categoryId'].value,
        quantityPerUnit: this.productForm.controls['quantityPerUnit'].value,
        unitPrice: this.productForm.controls['unitPrice'].value,
        unitsInStock: this.productForm.controls['unitsInStock'].value,
        unitsOnOrder: this.productForm.controls['unitsOnOrder'].value,
        reorderLevel: this.productForm.controls['reorderLevel'].value,
        discontinued: this.productForm.controls['discontinued'].value
          } as Product ;

    if (productId != null)
      this.product.productId = productId;

  }

  private setProduct() {
    const productId = this.route.snapshot.paramMap.get('productId');
    if(productId)
      this.productsService.getProduct(+productId).subscribe(
      {
        next: productResult => {
          this.product = productResult;
          this.initializeForm();
        }
      }
      );
  }

  private reloadSavedProduct(product: Product) {
    if(product) {
      const productId = product.productId;
      this.router.navigate([`/products/product-edit/${productId}`]);
    }
  }
//#endregion

//#region Modals and Toasts
  private displayModalYesNo(modalBody: string) {
    this.modalYesNoBody = modalBody;
    const btnShowModalYesNo = document.getElementById("showModalYesNo");
    if(btnShowModalYesNo)
      btnShowModalYesNo.click();
  }

  private displayModalMessage() {
    const btnShowModalMessage = document.getElementById("showModalMessage");
    if(btnShowModalMessage)
      btnShowModalMessage.click();
  }

  private toastClick() {
    const btnToast = document.getElementById("liveToastBtn");
    console.log(btnToast);
    if(btnToast){
      btnToast.click();
      btnToast.click();
    }
  }
//#endregion

}
