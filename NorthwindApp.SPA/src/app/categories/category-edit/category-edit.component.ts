import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Category } from 'src/app/_models/category';
import { CategoriesService } from 'src/app/_services/categories.service';
import { PhotosService } from 'src/app/_services/photos.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category:  Category = {} as Category;
  categoryForm: FormGroup = new FormGroup({});
  picture?: string;
  modalTitle = "Category";
  modalBody = "";

  constructor( private categoriesService: CategoriesService, private route: ActivatedRoute, public photosService: PhotosService,
    private router: Router ) { }

  ngOnInit() {
      this.initializeForm();
      this.setCategory();
  }

  toolbarButtonWasClicked(buttonName: string) {
    let modalBody = "";
    switch(buttonName){
      case "new":
        modalBody = "Do you wish to clear this Category?";
        this.displayYesNoModal(modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Category?";
        this.displayYesNoModal(modalBody);
        break;
      case "return":
        this.router.navigate(['/categories/category-list']);
        break;
    }
  }

  modalButtonWasClicked(button: string) {
    console.log(button);
    const modalYesNo = document.getElementById("modalyesno");
    if(modalYesNo)
      modalYesNo.style.display = 'none';
    this.clearForm();
    switch(button) {
      case "btnYes":
        break;
      case "btnNo":
        break;
    }
    this.getPicture();
    // console.log(this.picture);
  }

  private displayYesNoModal(modalBody: string) {
    this.modalBody = modalBody;
    const btnShowModal = document.getElementById("showModal");
    if(btnShowModal)
      btnShowModal.click();
  }

  private clearForm() {
    this.category = {} as Category;
    this.picture = '';
    this.initializeForm();
    this.setPicture();
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
            this.setPicture();
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
  }

  setPicture() {

    if(Object.keys(this.category).length >0)
      this.picture = 'data:image/jpg;base64,' + this.category?.picture;
    else
      this.picture = '../../../assets/Blank.png';

    this.photosService.setPhoto(this.picture);
  }

  getPicture() {

    this.photosService.getPhoto().subscribe({
      next: photoResult => {
        if(photoResult.length > 0)
        {
          this.picture = photoResult;
        }
      }
    })

  }

}
