import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClassService } from '../../services/class.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    currentUser;
    title = '';
    classes = [];

    colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

    constructor(
        private authService: AuthService,
        private classService: ClassService,
        private router: Router
    ) { }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.getClasses();
    }

    color(index) {
        return `${this.colors[index]}`;
    }

    async getClasses() {
        const results = await this.classService.getClasses();
        results.forEach(result => this.classes.push({id: result.id, ...result.data()}));
    }

    addClass() {
        this.classService.addClass(this.title);
    }

    viewClass(classData) {
        this.router.navigate(['/class', classData.id]);
    }

}
