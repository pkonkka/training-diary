import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs/Rx';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2';

import { AuthInfo } from './auth-info';

@Injectable()
export class AuthService {

  authSub: Subscription;

  static UNKNOWN_USER = new AuthInfo(null, null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);


  // ------------------------------------------------------------------------------------------------
  constructor(private af: AngularFire) {

    
   }


  // ------------------------------------------------------------------------------------------------
   login(email, password): Observable<any> {
    
    // does not work always:
    //  return Observable.fromPromise(this.af.auth.login({ email, password }));
    
    // this should work always:
    const obs = this.af.auth.login({ email, password });
    return this.fromFirebaseAuthPromise(obs);

   }


  // ------------------------------------------------------------------------------------------------
  signUp(email, password) {
    return this.fromFirebaseAuthPromise(this.af.auth.createUser({email, password}));
  }

  // ------------------------------------------------------------------------------------------------
   logout() {
     this.af.auth.logout();
     this.authInfo$.next(AuthService.UNKNOWN_USER);
     if (this.authSub) { this.authSub.unsubscribe(); }
   }

  // ------------------------------------------------------------------------------------------------
   fromFirebaseAuthPromise(promise): Observable<any> {
     
     const subject = new Subject<any>();

     promise 
      .then(res => {
        let authInfo;

        // const authInfo = new AuthInfo(this.af.auth.getAuth().uid, this.af.auth.getAuth().auth.email);
        // this.authInfo$.next(authInfo);
        // subject.next(res);
        // subject.complete();
        
        this.authSub = this.af.auth.subscribe(
          auth => {
            if (auth) {
              authInfo = new AuthInfo(auth.uid, auth.auth.email);
              this.authInfo$.next(authInfo);
              subject.next(res);
              subject.complete();
            }
          }
        )
        
      },
      err => {
        this.authInfo$.error(err);
        subject.error(err);
        subject.complete();
      });

      return subject.asObservable();

   }

}
