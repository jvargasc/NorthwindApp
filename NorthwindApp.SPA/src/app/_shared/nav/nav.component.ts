import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

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
