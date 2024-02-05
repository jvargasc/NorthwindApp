import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotosService  {

  private photosSource = new BehaviorSubject<string>('');
  photos$ = this.photosSource.asObservable();

  constructor() { }

  setPhoto(photo: string) {
    this.photosSource.next(photo);
  }

  getPhoto() {
    return this.photos$;
  }

}
