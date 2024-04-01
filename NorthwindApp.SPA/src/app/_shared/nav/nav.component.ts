import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';
import { SignupLoginComponent } from '../modals/signup-login/signup-login.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  checkboxMenu = true;
  user: User;
  loginModel: any = {
    username : '',
    password : ''
 };

  loggedIn = false;
  modalRef: BsModalRef;

  constructor(private userService: UsersService, private router: Router, private modalService: BsModalService ) {
    this.checkboxMenu = false;
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.initializeForm();
  }

  getCurrentUser() {
    this.userService.currentUser$.subscribe({
      next: user => {
        this.loggedIn = !!user;
        this.user = user;
      },
      error: error => console.log(error)
    });
  }

  login() {
    this.loginModel = {
    username : this.loginForm.controls['username'].value,
    password : this.loginForm.controls['password'].value
      };

    this.userService.login(this.loginModel).subscribe({
      next: response => {
        console.log(response);
        this.loggedIn = true;
      },
      error: error => console.log(error)
    });
  }

  logout() {
    this.userService.logout();
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }

  signUp() {
    this.displayModalSign(1);
    console.log('Show signUp()');
  }

  signIn() {
    this.displayModalSign(2);
    console.log('Show signIn()');
  }

  checkboxClicked() {
    this.checkboxMenu = !this.checkboxMenu;
  }

  private initializeForm() {
    this.loginForm = new FormGroup({
    'username' : new FormControl(this.loginModel.username),
    'password' : new FormControl(this.loginModel.password)
    })
  }

    private displayModalSign(option: number) {

    // const modalMessageData: ModalMessageData = {
    //   title: 'Categories', body: body, button: 'btn-danger'
    // }

    this.modalRef = this.modalService.show(SignupLoginComponent);
  }

}
