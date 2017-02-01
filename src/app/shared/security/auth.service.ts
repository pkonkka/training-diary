import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

import { AuthInfo } from './auth-info';

@Injectable()
export class AuthService {

  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);


  // ------------------------------------------------------------------------------------------------
  constructor(private af: AngularFire) {

    
   }


  // ------------------------------------------------------------------------------------------------
   login(email, password): Observable<any> {
    
    // does not work always:
    //  return Observable.fromPromise(this.auth.login({ email, password }));
    
    // this should work always:
    return this.fromFirebaseAuthPromise(this.af.auth.login({ email, password }));

   }


  // ------------------------------------------------------------------------------------------------
   signUp(email, password) {
     return this.fromFirebaseAuthPromise(this.af.auth.createUser({email, password}));
   }


   logout() {
     this.af.auth.logout();
     this.authInfo$.next(AuthService.UNKNOWN_USER);
   }

  // ------------------------------------------------------------------------------------------------
   fromFirebaseAuthPromise(promise): Observable<any> {
     
     const subject = new Subject<any>();

     promise 
      .then(res => {
        const authInfo = new AuthInfo(this.af.auth.getAuth().uid);
        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },
      err => {
        this.authInfo$.error(err);
        subject.error(err);
        subject.complete();
      });

      return subject.asObservable();

   }

}
