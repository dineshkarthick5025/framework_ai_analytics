import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DataComponent } from './data/data.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoryComponent } from './history/history.component';
import { NewdashboardComponent } from './dashboard/newdashboard/newdashboard.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
export const routes: Routes = [
  { path: '', component:  UserAuthComponent }, 
  { path: 'home', component: HomeComponent },
  { path: 'data', component: DataComponent },
   { path: 'dashboard', component: DashboardComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'newdashboard', component: NewdashboardComponent },
];
