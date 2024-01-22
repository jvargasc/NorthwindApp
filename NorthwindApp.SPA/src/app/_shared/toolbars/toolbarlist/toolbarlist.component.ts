import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-toolbarlist',
  templateUrl: './toolbarlist.component.html',
  styleUrls: ['./toolbarlist.component.css']
})
export class ToolbarlistComponent {

  @Output() toolbarButtonWasClicked = new EventEmitter<string>();

  buttonClicked(event: MouseEvent) {
    const elementId: string = (event.target as Element).id;
    this.toolbarButtonWasClicked.emit(elementId);
  }

}
