import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router'; 

import { AuthService } from '../shared/security/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form: FormGroup;


  // ------------------------------------------------------------------------------------------------------------------
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { 

    this.form = this.fb.group({
      email:    ['', Validators.pattern(
          '/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i')],
      password: ['', Validators.required]
    });

  }


  // ------------------------------------------------------------------------------------------------------------------
  login() {

    const formValue = this.form.value;

    this.authService.login(formValue.email, formValue.password)
      .subscribe(
        () => this.router.navigate(['']),
        alert
      );


  }

}
