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


    const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    this.form = this.fb.group({

      email:    ['', Validators.pattern(emailRegex)],
      password: ['', Validators.required]

    });

  }


  // ------------------------------------------------------------------------------------------------------------------
  login() {

    const formValue = this.form.value;

    this.authService.login(formValue.email, formValue.password)
      .subscribe(
        () => {
          console.log('111');
          this.router.navigate([''])
        },
        err => {
          console.log('Hmmm');
          alert(err);
        }        
      );


  }

}
