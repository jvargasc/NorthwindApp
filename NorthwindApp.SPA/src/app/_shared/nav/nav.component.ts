import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  checkboxMenu = true;

  constructor() { this.checkboxMenu = false; }

  checkboxClicked() {
    this.checkboxMenu = !this.checkboxMenu;
  }

}
