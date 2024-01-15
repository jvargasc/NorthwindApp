import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbarcrud',
  templateUrl: './toolbarcrud.component.html',
  styleUrls: ['./toolbarcrud.component.css']
})
export class ToolbarCrudComponent {

  @Output() toolbarButtonWasClicked = new EventEmitter<string>();

  buttonClicked(event: MouseEvent) {
    const elementId: string = (event.target as Element).id;
    this.toolbarButtonWasClicked.emit(elementId);
    console.log((event.target as Element).id);
// console.log(event);
  }

}
