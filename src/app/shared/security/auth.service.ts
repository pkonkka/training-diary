import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs/Rx';
import { AngularFire, AuthMethods, AuthProviders } from 'angularfire2'; 

@Injectable()
export class AuthService {

  constructor(private af: AngularFire) {

    
   }


   login(email, password): Observable<any> {
    
    // does not work always:
    //  return Observable.fromPromise(this.auth.login({ email, password }));
    
    // this should work always:
    return this.fromFirebaseAuthPromise(this.af.auth.login({ email, password }));

   }



   fromFirebaseAuthPromise(promise): Observable<any> {
     
     const subject = new Subject<any>();

     promise 
      .then(res => {
        subject.next(res);
        subject.complete();
      },
      err => {
        subject.error(err);
        subject.complete();
      });

      return subject.asObservable();

   }

}
