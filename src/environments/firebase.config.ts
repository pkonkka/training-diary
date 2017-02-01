
import {AuthMethods, AuthProviders} from 'angularfire2';

export const firebaseConfig = {
    apiKey: 'AIzaSyAGbsGG6sSFz4GkcHLIKHHJ7UUtLsEYNhs',
    authDomain: 'gym-log-33bb9.firebaseapp.com',
    databaseURL: 'https://gym-log-33bb9.firebaseio.com',
    storageBucket: 'gym-log-33bb9.appspot.com',
    messagingSenderId: '741736257105'
};

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};