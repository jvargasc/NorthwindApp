import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/_models/category';
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

  constructor(private productsService: ProductsService, private categoriesservice: CategoriesService, private suppliersservice: SuppliersService, private router: Router ) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(
      {
        next: productsResult => { this.products = productsResult; }
      }
    );
    this.getParameters();
  }

  buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
            case "new":
        this.router.navigate(['/categories/category-edit']);
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
