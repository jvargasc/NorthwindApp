import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  pictureSufix: string = "data:image/jpg;base64,";
  blankPicture = '../../../assets/images/Blank.png';
  modalTitle = "Category";
  modalYesNoBody = "";
  modalMessageBody = "";
  toolbarButtonPressed = "";
  headerToast = "Category";
  bodyToast = "Record successfully saved!!!";

  @ViewChild('categoryName') categoryName: ElementRef;
  @ViewChild('description') description: ElementRef;

  constructor( private categoriesService: CategoriesService, private route: ActivatedRoute, private photosService: PhotosService, private router: Router ) { }

  ngOnInit() {
    this.initializeForm();
    this.setCategory();
    this.toastClick();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";
    switch(buttonName) {
      case "new":
        modalBody = "Do you wish to clear this Category and create a new one?";
        this.displayModalYesNo(modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Category?";
        this.displayModalYesNo(modalBody);
        break;
      case "return":
        this.router.navigate(['/categories/category-list']);
        break;
    }
  }

  modalButtonWasClicked(button: string) {
    this.getPicture();
    switch(button) {
      case "btnYes":
        if (this.toolbarButtonPressed == "new")
          this.clearForm();
        if (this.toolbarButtonPressed == "save")
            if(this.requiredFieldsValid())
              this.createOrUpdateCategory();
      break;
      case "btnNo":
        break;
      }

    this.toolbarButtonPressed = ""
  }
//#endregion

//#region Handle Form
  private initializeForm() {
    this.categoryForm = new FormGroup({
      'categoryId' : new FormControl(this.category?.categoryId),
      'categoryName' : new FormControl(this.category?.categoryName, Validators.required),
      'description' : new FormControl(this.category?.description, Validators.required),
      'picture' : new FormControl(this.category?.picture, Validators.required),
    });

    this.categoryForm.controls['categoryId'].disable();
  }

  private clearForm() {
    this.categoryName.nativeElement.classList.remove('ng-touched');
    this.description.nativeElement.classList.remove('ng-touched');
    this.highLightPicture(false);
    this.router.navigate(['/categories/category-edit']);
    this.category = {} as Category;
    this.picture = '';
    this.initializeForm();
    this.setPicture();
  }

  private requiredFieldsValid(): boolean {
    let tmpValue = false;
    let displayModalMessage = false;

    if(!this.categoryForm.valid) {
      for (const field in this.categoryForm.controls) { // 'field' is a string
        const tmpControl = this.categoryForm.get(field); // 'control' is a FormControl
        if(tmpControl.invalid) {
          switch(field) {
            case "categoryName":
              this.categoryName.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            case "description":
              this.description.nativeElement.classList.add('ng-touched');
              displayModalMessage = true;
              break;
            }
          }
        }

     }

    if ((this.picture == this.blankPicture) || this.picture === undefined) {
      displayModalMessage = true;
      this.highLightPicture(true);
    }

    if(displayModalMessage) {
      this.modalMessageBody = "There are required fields that you must complete.";
      this.displayModalMessage();
    }

    return !displayModalMessage;
  }
//#endregion

//#region Handle Category
  private createOrUpdateCategory() {
    let categoryId = this.categoryForm.controls['categoryId'].value;

    this.setValuesForCategory(categoryId);
    if (categoryId == null)
      this.categoriesService.createCategory(this.category)
          .subscribe({
            next: categoryResult => {
              this.reloadSavedCategory(categoryResult);
              this.toastClick();
            },
            error: errorResult => {
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
            }
          });
    else
        this.categoriesService.updateCategory(this.category)
        .subscribe({
          next: categoryResult => {
            this.reloadSavedCategory(categoryResult);
            this.toastClick();
          },
            error: errorResult => {
              this.modalMessageBody = JSON.stringify(errorResult);
              this.displayModalMessage();
            }
        });
  }

  private setValuesForCategory(categoryId: number) {

    this.getPicture();
    if (this.picture != null)
      if (this.picture.length > 0) {
        const newPic = this.picture.replace(this.pictureSufix, "");
        this.category = {
            categoryName: this.categoryForm.controls['categoryName'].value,
            description: this.categoryForm.controls['description'].value,
            picture: newPic
              } as Category ;
      }

    if (categoryId != null)
      this.category.categoryId = categoryId;

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

  private reloadSavedCategory(category: Category) {
    if(category) {
      const categoryId = category.categoryId;
      this.router.navigate([`/categories/category-edit/${categoryId}`]);
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
    if(btnToast)
      btnToast.click();
  }
//#endregion

//#region Picture
  private setPicture() {

    if(Object.keys(this.category).length >0) {
      this.highLightPicture(false);
      this.picture = this.pictureSufix + this.category?.picture;
    }
    else
      this.picture = this.blankPicture;

    this.photosService.setPhoto(this.picture);
  }

  private getPicture() {

    this.photosService.getPhoto().subscribe({
      next: photoResult => {
        if(photoResult.length > 0) {
          this.picture = photoResult;
          this.categoryForm.controls['picture'].setValue(photoResult);
          this.highLightPicture(false);
        } else
            this.displayModalMessage();
      }
    })

  }

  private highLightPicture(show: boolean) {

    const colPhotoUpload = document.getElementById('col-photo-upload');
    const classesList: string[] = [ 'ng-invalid', 'ng-touched' ];

    if(show) {
      colPhotoUpload.classList.add(...classesList);
    } else {
      colPhotoUpload.classList.remove(...classesList);
    }
  }
//#endregion

}
