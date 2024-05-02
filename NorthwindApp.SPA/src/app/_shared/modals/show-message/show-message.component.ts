import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-show-message',
  templateUrl: './show-message.component.html',
  styleUrls: ['./show-message.component.css']
})
export class ShowMessageComponent {
  modalMessageData = {
    title: '', body: '', button: ''
  };
  _bsModalRef: BsModalRef;

  constructor(private bsModalRef: BsModalRef) {
    this._bsModalRef = bsModalRef;
  }

  onConfirm(): void {
      this.bsModalRef.hide();
  }

}
