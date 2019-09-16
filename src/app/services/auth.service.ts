import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor(private router: Router) {}

    login(email, password) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(async () => {
            const result = firebase.auth().signInWithEmailAndPassword(email, password);
            if (result) {
                this.router.navigate(['home']);
            }
            return result;
        });
    }

    getCurrentUser() {
        return firebase.auth().currentUser;
    }
}
