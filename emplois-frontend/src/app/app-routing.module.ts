import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JobComponent } from './components/job/job.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path : '', component : HomeComponent },
  { path : 'login', component : LoginComponent },
  { path : 'register', component : RegisterComponent },
  { path : 'jobs/:id', component : JobComponent },
  { path : 'jobs/search/:query', component : SearchComponent },
  { path : 'profile', loadChildren : './modules/profile/profile.module#ProfileModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
