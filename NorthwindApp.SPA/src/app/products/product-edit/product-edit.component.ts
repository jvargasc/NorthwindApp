import { Component, OnInit } from '@angular/core';
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
  modalTitle: string = "modal Title!!";
  modalBody: string = "modal Body!!";
  categories: Category[] = [];
  suppliers: Supplier[] = [];

  constructor( private productsservice: ProductsService, private categoriesservice: CategoriesService, private suppliersservice: SuppliersService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.setParameters();
    this.initializeForm();
    this.setProduct();
  }

  toolbarButtonWasClicked(buttonName: string) {
    switch(buttonName){
      case "new":
        this.displayYesNoModal();
        break;
      case "save":
        console.log(buttonName);
        break;
      case "return":
        this.router.navigate(['/products/product-list']);
        break;
    }
  }

  modalButtonWasClicked(button: string) {
    switch(button) {
      case "btnYes":
        const modalYesNo = document.getElementById("modalyesno");
        if(modalYesNo)
          modalYesNo.style.display = 'none';
        this.clearForm();
        break;
      case "btnNo":
        break;
    }
  }

  getSupplier(supplierId: number)  : string | undefined {
    const supplier = this.suppliers.find(r => r.supplierId === supplierId);
    return supplier ? supplier.companyName : undefined;
  }

  getCategory(categoryId: number)  : string | undefined {
    const category = this.categories.find(r => r.categoryId === categoryId);
    return category ? category.categoryName : undefined;
  }

  private setProduct() {
    const productId = this.route.snapshot.paramMap.get('productId');
    if(productId)
      this.productsservice.getProduct(+productId).subscribe(
      {
        next: productResult => {
          this.product = productResult;
          this.initializeForm();
        }
      }
      );
  }

  private displayYesNoModal() {
    const btnShowModal = document.getElementById("showModal");
    if(btnShowModal)
      btnShowModal.click();
  }

  private clearForm() {
    this.product = {} as Product;
    this.initializeForm();
    this.router.navigate(['/products/product-edit']);
  }

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

  private setParameters() {
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

}
