import { Routes } from '@angular/router';
/**
 * Root-level route definitions
 * Note: For child paths use the feature modules *-routing.module declaration.
 */
export const APP_ROUTES: Routes = [
    {
        path: 'login',
        loadChildren: './pages/login/login.module#LoginModule'
    },
    {
        path: 'home',
        loadChildren: './pages/home/home.module#HomeModule'
    },
    {
        path: 'class/:identity',
        loadChildren: './pages/class/class.module#ClassModule'
    },
    /**
     * Default path match when no routes match the user's destination path.
     * Redirect to a main page or a 404 page.
     */
    {
        path: '**',
        redirectTo: '/home'
    }
];
