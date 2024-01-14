import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbarcrud',
  templateUrl: './toolbarcrud.component.html',
  styleUrls: ['./toolbarcrud.component.css']
})
export class ToolbarCrudComponent {

  buttonClicked(event: MouseEvent) {
    const elementId: string = (event.target as Element).id;
    console.log((event.target as Element).id);
// console.log(event);
  }

}
