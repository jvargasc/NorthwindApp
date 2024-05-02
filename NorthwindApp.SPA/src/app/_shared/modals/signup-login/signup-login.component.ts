import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { LoginInfo } from 'src/app/_models/logininfo';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.css']
})
export class SignupLoginComponent implements OnInit {

  signOption: number;

  onClose: Subject<LoginInfo>;
  signInLoginForm: FormGroup = new FormGroup({});
  signUpLoginForm: FormGroup = new FormGroup({});
  tabVisibleItems = [
    { tabName : 'signup' },
    { tabName : 'signin' }
  ];

  tabVisible = '';

  constructor( ) { }

  ngOnInit() {
    this.tabVisible = this.tabVisibleItems[this.signOption].tabName;
    this.initializeForms();
    this.onClose = new Subject();
  }

  private initializeForms() {

    this.signUpLoginForm = new FormGroup({
      usernameSignUp : new FormControl(null, Validators.required),
      passwordSignUp : new FormControl(null, Validators.required),
      passwordConfirmationSignUp : new FormControl(null, [Validators.required, this.matchValues('passwordSignUp')])
    });

    this.signInLoginForm = new FormGroup({
      usernameSignIn : new FormControl(null, Validators.required),
      passwordSignIn : new FormControl(null, Validators.required)
    });

    this.signUpLoginForm.controls['passwordSignUp'].valueChanges.subscribe({
      next: () => this.signUpLoginForm.controls['passwordConfirmationSignUp'].updateValueAndValidity()
    });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {notMatching: true}
    }
  }

  clickedTitle(index: number) {
    this.tabVisible = this.tabVisibleItems[index].tabName;
  }

  btnSignIn() {
    let username = this.signInLoginForm.controls['usernameSignIn'].value;
    let password = this.signInLoginForm.controls['passwordSignIn'].value;
    let loginInfo : LoginInfo = { signOption: 'signIn', username: username, password: password } ;
    this.onClose.next(loginInfo);
  }

  btnSignUp() {
    let username = this.signUpLoginForm.controls['usernameSignUp'].value;
    let password = this.signUpLoginForm.controls['passwordSignUp'].value;
    let loginInfo : LoginInfo = { signOption: 'signUp', username: username, password: password } ;
    this.onClose.next(loginInfo);
  }

  passwordsMath(): boolean {
    return (
      this.signUpLoginForm.controls['passwordConfirmationSignUp'].value
      &&
      this.signUpLoginForm.controls['passwordConfirmationSignUp'].dirty
      &&
      !this.signUpLoginForm.controls['passwordConfirmationSignUp'].valid
    );
  }

}
