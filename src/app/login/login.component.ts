import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'; 

import { AuthService } from '../shared/security/auth.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;


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

}
