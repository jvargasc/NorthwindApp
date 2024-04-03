import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { UsersService } from 'src/app/_services/users.service';
import { SignupLoginComponent } from '../modals/signup-login/signup-login.component';
import { LoginInfo } from 'src/app/_models/logininfo';
import { ModalMessageData } from 'src/app/_models/modalmessagedata';
import { ShowMessageComponent } from '../modals/show-message/show-message.component';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({});
  checkboxMenu = true;
  user: User;
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
      error: error => {
        this.displayModalMessage(error, 'btn-danger')
      }
    });
  }

  signUp(loginModel: LoginInfo) {
    this.userService.register(loginModel).subscribe({
      next: response => {
        this.modalService.hide();
        this.loggedIn = true;
        this.router.navigate(['/home']);
        this.displayModalMessage('User Created Successfully!!!', 'btn-success');
      },
      error: loginResult => {
        let body = JSON.stringify(loginResult.error);
        this.displayModalMessage(body, 'btn-danger');
      }
    });
  }

  signIn(loginModel: LoginInfo) {
    this.userService.login(loginModel).subscribe({
      next: response => {
        this.modalService.hide();
        this.loggedIn = true;
        this.router.navigate(['/home']);
      },
      error: loginResult => {
        this.displayModalMessage(JSON.stringify(loginResult.error), 'btn-danger')
      }
    });
  }

  signOut() {
    this.userService.logout();
    this.loggedIn = false;
    this.router.navigate(['/home']);
  }

  checkboxClicked() {
    this.checkboxMenu = !this.checkboxMenu;
  }

  private initializeForm() {
    this.loginForm = new FormGroup({
    'username' : new FormControl(null),
    'password' : new FormControl(null)
    });
  }

  displayModalSignupLogin(option: number) {

    let signOption = option;
    let modalRef: BsModalRef;

    modalRef = this.modalService.show(SignupLoginComponent,
      { initialState: { signOption } } );
    modalRef.content.onClose.subscribe({
      next: loginResult => {
        let signOptionResult = loginResult['signOption'];
        if(signOptionResult == 'signUp')
          this.signUp(loginResult);
        else if(signOptionResult == 'signIn')
          this.signIn(loginResult);
        else
          console.log('ERROR!!!!');
      },
      error: errorResult => {
        let body = JSON.stringify(errorResult.error);
        this.displayModalMessage(body, 'btn-danger');
      }
    });

  }

  private displayModalMessage(body: string, button: string) {

    const modalMessageData: ModalMessageData = {
      title: 'Sign Up', body: body, button: button
    }

    this.modalRef = this.modalService.show(ShowMessageComponent, { initialState : { modalMessageData } });
  }

}
