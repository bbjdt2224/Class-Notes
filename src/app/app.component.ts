import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'app';

    firebaseConfig = {
        apiKey: 'AIzaSyB6_-pnxUBtKsT20nYSP32mrgvNUCrdSDE',
        authDomain: 'justin-s-firebase.firebaseapp.com',
        databaseURL: 'https://justin-s-firebase.firebaseio.com',
        projectId: 'justin-s-firebase',
        storageBucket: 'justin-s-firebase.appspot.com',
        messagingSenderId: '762075790820',
        appId: '1:762075790820:web:ce1ded463cdc3d35621bf1'
    };

    constructor() {
        firebase.initializeApp(this.firebaseConfig);
    }
}
