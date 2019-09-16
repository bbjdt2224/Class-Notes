import { NgModule } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClassService } from '../../services/class.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClassComponent } from '../class/class.component';
import { ClassRoutingModule } from './class-routing.module';

@NgModule({
    imports: [
        ClassRoutingModule,
        FormsModule,
        CommonModule
    ],
    exports: [
        ClassRoutingModule
    ],
    declarations: [
        ClassComponent
    ],
    providers: [
        AuthService,
        ClassService
    ]
})
export class ClassModule { }
