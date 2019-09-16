import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassComponent } from '../class/class.component';

export const ContentRoutes: Routes = [
    {
        path: '',
        component: ClassComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(ContentRoutes)],
    exports: [RouterModule]
})
export class ClassRoutingModule   { }
