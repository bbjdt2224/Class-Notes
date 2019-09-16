import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutingModule } from './login-routing.module';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@NgModule({
    imports: [
        LoginRoutingModule,
        FormsModule
    ],
    exports: [
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [
        AuthService
    ]
})
export class LoginModule { }
