import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.css']
})
export class PhotoUploadComponent implements OnInit {
  imageURL: string = "";
  uploadForm: FormGroup;
  @Input() picture?: string = '';

  constructor() {
    // Reactive Form
    this.initializeForm();
  }

  ngOnInit() {
    console.log('length --> ' + this.picture.length);
    if(this.picture.length > 0)
      this.setPicture();
   }

  // Image Preview
  showPreview(event: any) {
    if(event.target) {
      const file = (event.target as HTMLInputElement).files[0];
      this.uploadForm.patchValue({
        avatar: file
      });
      this.uploadForm.get('avatar').updateValueAndValidity()
      // File Preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
      }
      reader.readAsDataURL(file)
    }
  }

  // Submit Form
  submit() {

  }

  private initializeForm() {
    this.uploadForm = new FormGroup({
      'avatar': new FormControl(null),
      'name': new FormControl('')
    });
  }

  private setPicture() {
    console.log('picture --> ' + this.picture);
  }


}
