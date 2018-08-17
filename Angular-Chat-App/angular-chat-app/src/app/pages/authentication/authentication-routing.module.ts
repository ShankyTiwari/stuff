import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AuthGuardService as AuthGuard
} from './../../services/auth-guard/auth-guard.service';

import { AuthenticationComponent } from './authentication.component';

const routes: Routes = [{
  path: '',
  component: AuthenticationComponent,
  canLoad: [AuthGuard]
}, {
  path: '**',
  redirectTo: '',
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
