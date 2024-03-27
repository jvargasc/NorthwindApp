import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modalsshowmessage',
  templateUrl: './modalsshowmessage.component.html',
  styleUrls: ['./modalsshowmessage.component.css']
})
export class ModalsShowMessageComponent {
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
