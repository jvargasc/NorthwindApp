import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { PhotosService } from 'src/app/_services/photos.service';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
  imageURL: string = "";
  photoForm: FormGroup;

  constructor(private photosService: PhotosService ) {
    // Reactive Form
    this.initializeForm();
  }

  ngOnInit() {
    this.photosService.getPhoto().subscribe({
      next: photoResult => {
        if(photoResult.length > 0)
        {
          this.setPicture(photoResult);
        }
      }
    })
  }

  // Image Preview
  showPreview(event: any) {
    // console.log(event.target);
    if(event.target) {
      const file = (event.target as HTMLInputElement).files[0];
      // console.log(file);
      this.photoForm.patchValue({
        avatar: file
      });
      this.photoForm.get('avatar').updateValueAndValidity()

      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
        this.photosService.setPhoto(reader.result.toString());
      }
      reader.readAsDataURL(file)
    }
  }

  // Submit Form
  submit() {

  }

  private initializeForm() {
    this.photoForm = new FormGroup({
      'avatar': new FormControl(null),
      'name': new FormControl(''),
      'inputPhoto': new FormControl('')
    });
  }

  private setPicture(picture: string) {
    this.imageURL = picture;
    const inputPhoto = document.getElementById('inputPhoto');
    // console.log(inputPhoto);
    // this.showPreview("$event");

// // : true, 'ng-touched' : true, 'ng-dirty' : true}"
//     inputPhoto.classList.remove('ng-untouched');
//     inputPhoto.classList.remove("ng-pristine");
//     // inputPhoto.classList.remove("ng-valid");

//     // inputPhoto.classList.add ('ng-valid');
//     inputPhoto.classList.add ('ng-touched');
//     inputPhoto.classList.add ('ng-dirty');

    // inputPhoto.innerText = "";
    // this.photoForm.controls['inputPhoto']. = false;
    // console.log(this.photoForm.controls['inputPhoto'].valid = false);
    // this.photoForm.controls['inputPhoto'].setValue(this.imageURL);
  }

}
