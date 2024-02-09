import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modalmessage',
  templateUrl: './modalmessage.component.html',
  styleUrls: ['./modalmessage.component.css']
})
export class ModalMessageComponent {

  @Input() modalTitle = '';
  @Input() modalBody = '';

}
