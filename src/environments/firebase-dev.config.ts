import {AuthMethods, AuthProviders} from 'angularfire2';  
  
// Initialize Firebase
export const firebaseDevConfig = {
    apiKey: "AIzaSyAHPRkox6iCRfqJk9NSYiE67P4WNOPf498",
    authDomain: "gym-log-dev.firebaseapp.com",
    databaseURL: "https://gym-log-dev.firebaseio.com",
    storageBucket: "gym-log-dev.appspot.com",
    messagingSenderId: "1072925812240"
};

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};