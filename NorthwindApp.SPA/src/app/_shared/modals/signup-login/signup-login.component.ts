import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.css']
})
export class SignupLoginComponent implements OnInit {

  signUpLoginForm: FormGroup = new FormGroup({});

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {

    this.signUpLoginForm = new FormGroup({
      'login' : new FormControl(null, Validators.required),
      'password' : new FormControl(null, Validators.required)
    });

  }

  btnLogin() {
    console.log('btnLogin()');
    console.log(this.signUpLoginForm.controls['login'].value + ' ' + this.signUpLoginForm.controls['password'].value
    );

  }

}
