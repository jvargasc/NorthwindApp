import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

import { Category } from 'src/app/_models/category';
import { ModalMessageData } from 'src/app/_models/modalmessagedata';
import { CategoriesService } from 'src/app/_services/categories.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { PhotosService } from 'src/app/_services/photos.service';
import { ModalsShowMessageComponent } from 'src/app/_shared/modals/modalsshowmessage/modalsshowmessage.component';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  category:  Category = {} as Category;
  categoryForm: FormGroup = new FormGroup({});
  picture?: string;
  picturePrefix: string = "data:image/jpeg;base64,";
  blankPicture: string = '../../../assets/images/Blank.png';
  modalTitle = "Category";
  modalMessageBody = "";
  toolbarButtonPressed = "";
  bodyToast = "Record successfully saved!!!";

  savingRecord = false;
  pictureAssigned = false;

  modalRef: BsModalRef;

  constructor( private categoriesService: CategoriesService, private route: ActivatedRoute, private photosService: PhotosService, private router: Router, private toastr: ToastrService, private confirmService: ConfirmService, private modalService: BsModalService) { }

  ngOnInit() {
    this.photosService.setPhoto(this.blankPicture);
    this.initializeForm();
    this.setCategory();
  }

//#region Buttons
  toolbarButtonWasClicked(buttonName: string) {
    this.toolbarButtonPressed = buttonName;
    let modalBody = "";
    this.getPicture();
    switch(buttonName) {
      case "new":
        modalBody = "Do you wish to clear this Category and create a new one?";
        this.displayModalYesNo(buttonName, modalBody);
        break;
      case "save":
        modalBody = "Do you wish to save this Category?";
        this.displayModalYesNo(buttonName, modalBody);
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
            else
              this.savingRecord = false;
      break;
      case "btnNo":
        break;
      }

    this.toolbarButtonPressed = ""
  }
//#endregion

//#region Handle Form
  throwDirtToControls() {

    if ((this.picture === this.blankPicture))
      return;

    if(!this.categoryForm.controls['categoryName'].value) {
      this.categoryForm.markAsDirty();
      return;
    }

    if(!this.categoryForm.controls['description'].value) {
      this.categoryForm.markAsDirty();
      return;
    }

  }

  private initializeForm() {
    this.savingRecord = false;
    this.pictureAssigned = false;
    this.categoryForm = new FormGroup({
      'categoryId' : new FormControl(this.category?.categoryId),
      'categoryName' : new FormControl(this.category?.categoryName, Validators.required),
      'description' : new FormControl(this.category?.description, Validators.required),
      'picture' : new FormControl(this.category?.picture, Validators.required),
    });

    this.categoryForm.controls['categoryId'].disable();
  }

  private clearForm() {
    this.highLightPicture(false);
    this.router.navigate(['/categories/category-edit']);
    this.category = {} as Category;
    this.picture = '';
    this.initializeForm();
    this.setPicture();
  }

  private requiredFieldsValid(): boolean {
    this.savingRecord = true;
    let tmpValue = false;
    let displayModalMessage = false;

    this.getPicture();

    if(!this.categoryForm.valid) displayModalMessage = true;

    if ((this.picture == this.blankPicture) || this.picture === undefined) {
      displayModalMessage = true;
      this.pictureAssigned = false
      this.highLightPicture(true);
    }

    if(displayModalMessage) {
      this.displayModalMessage("There are required fields that you must complete.");
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
              this.toastr.success(this.bodyToast);
            },
            error: errorResult => {
              this.displayModalMessage(JSON.stringify(errorResult));
            }
          });
    else
        this.categoriesService.updateCategory(this.category)
        .subscribe({
          next: categoryResult => {
            this.savingRecord = false;
            this.reloadSavedCategory(categoryResult);
            this.toastr.success(this.bodyToast);
          },
            error: errorResult => {
              this.displayModalMessage(JSON.stringify(errorResult));
            }
        });
  }

  private setValuesForCategory(categoryId: number) {

    if (this.picture != null)
      if (this.picture.length > 0) {
        let prefixPosition = this.picture.includes(this.picturePrefix);
        const newPic = this.picture.substring(
          prefixPosition ? this.picturePrefix.length : 0
        );
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

//#region Modals
  private displayModalYesNo(buttonName: string, modalBody: string) {

    let confirmationModalData = {
      title: 'Categories',
      message: modalBody,
      btnOkText: 'Yes',
      btnCancelText: 'No'
    }
    this.confirmService.confirmationModalData = confirmationModalData;

    this.confirmService.confirm().subscribe({
      next: buttonPressed => {
        if (buttonPressed)
          switch(buttonName) {
            case "new":
              this.clearForm();
              break;
            case "save":
              if(this.requiredFieldsValid())
                this.createOrUpdateCategory();
              break;
          }
        }
    });
  }

  private displayModalMessage(body: string) {

    const modalMessageData: ModalMessageData = {
      title: 'Categories', body: body, button: 'btn-danger'
    }

    this.modalRef = this.modalService.show(ModalsShowMessageComponent, { initialState : { modalMessageData } });
  }

//#endregion

//#region Picture
  private setPicture() {

    if(Object.keys(this.category).length >0) {
      this.highLightPicture(false);
      this.picture = this.picturePrefix + this.category?.picture;
      this.throwDirtToControls();
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
          this.pictureAssigned = true;
        } else {
          this.displayModalMessage("Picture Required");
          this.pictureAssigned = false;
        }
      }
    });

  }

  private highLightPicture(show: boolean) {
    // console.log('highLightPicture');
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
