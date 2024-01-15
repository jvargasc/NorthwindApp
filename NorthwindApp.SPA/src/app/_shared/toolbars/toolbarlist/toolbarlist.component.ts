import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbarlist',
  templateUrl: './toolbarlist.component.html',
  styleUrls: ['./toolbarlist.component.css']
})
export class ToolbarlistComponent {
  buttonClicked(event: MouseEvent) {
    const elementId: string = (event.target as Element).id;
    console.log((event.target as Element).id);
// console.log(event);
  }

}
