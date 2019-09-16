import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const ContentRoutes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(ContentRoutes)],
    exports: [RouterModule]
})
export class HomeRoutingModule { }
