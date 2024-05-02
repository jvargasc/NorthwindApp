import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../_shared/modals/confirm-dialog/confirm-dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModalRef?: BsModalRef<ConfirmDialogComponent>;

  constructor(private modalService: BsModalService) { }
  public confirmationModalData = {
    title: '',
    message: '',
    btnOkText: '',
    btnCancelText: ''
  };

  confirm(
    title = this.confirmationModalData.title,
    message = this.confirmationModalData.message,
    btnOkText = this.confirmationModalData.btnOkText,
    btnCancelText = this.confirmationModalData.btnCancelText
  ): Observable<boolean> {

    const config = {
      initialState: {
        title, message,
        btnOkText,
        btnCancelText
      }
    };

    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, config);
    return this.bsModalRef.onHidden!.pipe(
      map(() => {
        return this.bsModalRef!.content!.result;
      })
    );

  }

}
