import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/security/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authServce: AuthService, 
    private router: Router) {

      this.form = this.fb.group({
        email:    ['', Validators.required],
        password: ['', Validators.required],
        confirm:  ['', Validators.required]
      });

  }

  isPasswordMatch() {

    const val = this.form.value;
    return val && val.password && val.password === val.confirm;

  }

  signUp() {

    const val = this.form.value;

    this.authServce.signUp(val.email, val.password)
      .subscribe(
        () => {
          alert('User created successfully !');
          this.router.navigate(['']);
        },
        err => alert(err)
      );


  }


}
