import { Component, OnInit } from '@angular/core';

import { Category } from 'src/app/_models/category';
import { CategoriesService } from '../../_services/categories.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories: Category[] = [];

  constructor(private categoriesService: CategoriesService) {  }

  ngOnInit() {
    this.categoriesService.getCategories().subscribe(
      {
        next: categoriesResult => { this.categories = categoriesResult; }
      }
    )
  }

    buttonWasClicked(buttonName: string) {
    switch(buttonName)
    {
      case "refresh":
        location.reload();
        break;
      case "search":
        console.log(buttonName);
        break;
    }
  }

}
