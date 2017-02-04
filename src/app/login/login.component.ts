import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'; 
import { Cookie } from 'ng2-cookies/ng2-cookies';

import { AuthService } from '../shared/security/auth.service';
import { AuthInfo } from '../shared/security/auth-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;
  authInfo: AuthInfo;


  // ------------------------------------------------------------------------------------------------------------------
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 

    let email;

    if (Cookie.get('email')) {
      email = Cookie.get('email');
    }

    const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.form = this.fb.group({

      email:    [email, Validators.pattern(emailRegex)],
      password: ['', Validators.required]

    });


    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
    

  }


  // ------------------------------------------------------------------------------------------------------------------
  login() {

    const formValue = this.form.value;

    this.authService.login(formValue.email, formValue.password)
      .subscribe(
        () => {
          this.router.navigate(['']);
          Cookie.set('email', formValue.email);
        },
        err => {
          alert(err);
        }
      );
  }



  // // ------------------------------------------------------------------------
  // resetPassword() {
  //   console.log('resetPassword');
  //   this.authService.resetPassword(this.authInfo.email);
  // } 

}
