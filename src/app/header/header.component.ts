import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../shared/security/auth.service';
import { AuthInfo } from '../shared/security/auth-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  authInfo: AuthInfo;

  // ------------------------------------------------------------------------
  constructor(private authService: AuthService, private router: Router) { 

  }

  // ------------------------------------------------------------------------
  ngOnInit() {

    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);


  }

  // ------------------------------------------------------------------------
  logout() {

    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
