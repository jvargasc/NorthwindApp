import { Component, OnInit } from '@angular/core';
import { UsersService } from './_services/users.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.setCurrentUser();
  }

  containerClicked() {
    // console.log('containerClicked()');
  }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    if (!userString) return;
    const user: User = JSON.parse(userString);
    this.usersService.setCurrentUser(user);
  }

}
