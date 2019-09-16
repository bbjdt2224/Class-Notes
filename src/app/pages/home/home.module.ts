import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { AuthService } from '../../services/auth.service';
import { ClassService } from '../../services/class.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClassComponent } from '../class/class.component';

@NgModule({
    imports: [
        HomeRoutingModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        HomeRoutingModule
    ],
    declarations: [
        HomeComponent,
    ],
    providers: [
        AuthService,
        ClassService
    ]
})
export class HomeModule { }
