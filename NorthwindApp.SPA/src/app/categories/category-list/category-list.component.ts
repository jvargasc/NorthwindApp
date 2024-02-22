import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';

import { Category } from 'src/app/_models/category';
import { CategoriesService } from '../../_services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor( private categoriesService: CategoriesService, private router: Router) { }

  ngOnInit() {
    this.getCategories();
  }

  buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
      case "new":
        this.router.navigate(['/categories/category-edit']);
        break;
      case "refresh":
        location.reload();
        this.getCategories();
        break;
      case "search":
        break;
      default:
        console.log(buttonName);
    }
  }

  getCategories() {
    if (this.categories.length == 0)
      this.categoriesService.getCategories()
      .subscribe({
        next: categoriesResult => { this.categories = categoriesResult; }
      });
    else
    this.categoriesService.categories$.pipe(take(1))
      .subscribe({
        next: categoriesResult => {
            this.categories = categoriesResult;
        }
      });
  }

}
