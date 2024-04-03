import { Route } from '@angular/router';
import { ForgotPasswordComponent, LoginComponent, RegisterComponent } from '@bau/auth';
import { EmployerOverviewComponent } from './components/employers/employer-overview/employer-overview.component';
import { NewEmployersComponent } from './components/employers/new-employers/new-employers.component';
import { HomeComponent } from './components/home/home.component';
import { OverviewComponent } from './components/overview/overview.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';

export const appRoutes: Route[] = [

  { path: 'employees', component: EmployeeListComponent },
  
  { path: 'employer-overview/:id', component: EmployerOverviewComponent },
  { path: 'new-employer', component: NewEmployersComponent },

  { path: 'overview', component: OverviewComponent },
  { path: 'home', component: HomeComponent },
  
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];