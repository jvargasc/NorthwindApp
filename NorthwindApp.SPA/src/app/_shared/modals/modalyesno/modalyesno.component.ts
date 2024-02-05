import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modalyesno',
  templateUrl: './modalyesno.component.html',
  styleUrls: ['./modalyesno.component.css']
})
export class ModalyesnoComponent {
  @Input() modalTitle: string = '';
  @Input() modalBody: string = '';

  @Output() modalButtonWasClicked = new EventEmitter<string>();

  buttonClicked(event: MouseEvent) {
    const elementId: string = (event.target as Element).id;
    this.modalButtonWasClicked.emit(elementId);
  }

}
