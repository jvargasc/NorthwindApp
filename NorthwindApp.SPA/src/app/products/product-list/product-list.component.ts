import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/category';
import { Pagination } from 'src/app/_models/pagination';
import { Product } from 'src/app/_models/product';
import { Supplier } from 'src/app/_models/supplier';
import { CategoriesService } from 'src/app/_services/categories.service';
import { ProductsService } from 'src/app/_services/products.service';
import { SuppliersService } from 'src/app/_services/suppliers.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  suppliers: Supplier[] = [];
  categories: Category[] = [];
  pagination: Pagination | undefined;
  pageNumber = 1;
  pageSize = 10;

  constructor(private productsService: ProductsService, private categoriesservice: CategoriesService, private suppliersservice: SuppliersService, private router: Router ) { }

  ngOnInit() {
    this.loadProducts();
  }

  buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
      case "new":
        this.router.navigate(['/products/product-edit']);
        break;
      case "refresh":
        location.reload();
        break;
      case "search":
        console.log(buttonName);
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

  pageChanged(event: any) {
    if (this.pageNumber !== event.page) {
      this.pageNumber = event.page;
      this.loadProducts();
    }
  }


  private loadProducts() {
    this.productsService.getProducts(this.pageNumber, this.pageSize).subscribe({
      next: response => {
        if (response.result && response.pagination) {
          this.products = response.result;
          this.pagination = response.pagination;
        }
      }
    });
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

}
