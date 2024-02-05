import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from 'src/app/_models/category';
import { CategoriesService } from 'src/app/_services/categories.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category:  Category = {} as Category;
  categoryForm: FormGroup = new FormGroup({});
  picture?: string;
  modalTitle: string = "modal Title!!";
  modalBody: string = "modal Body!!";

  constructor( private categoriesService: CategoriesService, private route: ActivatedRoute,
    private router: Router ) { }

  ngOnInit() {
      this.initializeForm();
      this.setCategory();
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
        this.router.navigate(['/categories/category-list']);
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

  private displayYesNoModal() {
    const btnShowModal = document.getElementById("showModal");
    if(btnShowModal)
      btnShowModal.click();
  }

  private clearForm() {
    this.category = {} as Category;
    this.initializeForm();
    this.router.navigate(['/categories/category-edit']);
  }

  private setCategory() {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    if(categoryId)
      this.categoriesService.getCategory(+categoryId!).subscribe(
        {
          next: categoryResult => {
            this.category = categoryResult;
            this.initializeForm();
          }
        }
      );
  }

  private initializeForm() {
    this.categoryForm = new FormGroup({
      'categoryId' : new FormControl(this.category?.categoryId),
      'categoryName' : new FormControl(this.category?.categoryName),
      'description' : new FormControl(this.category?.description),
      'picture' : new FormControl(this.category?.picture),
    });

    this.categoryForm.controls['categoryId'].disable();
    if(Object.keys(this.category).length >0)
      this.picture = 'data:image/jpg;base64,' + this.category?.picture;
    else
      this.picture = '../../../assets/Blank.png';
  }

}
