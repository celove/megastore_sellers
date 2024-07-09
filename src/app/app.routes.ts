import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
// import { AuthGuard } from './guards/auth.guard';
import { CreateUserComponent } from './components/create-user/create-user.component';
import { UserDashboardComponent } from './components/dashboards/user-dashboard/user-dashboard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'user/:id', component: CreateUserComponent
    },
    {
        path: 'dashboard-user', component: UserDashboardComponent
    }
];
