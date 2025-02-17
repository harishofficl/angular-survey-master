import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from "../utils/nav-bar/nav-bar.component";


@NgModule({
  declarations: [LoginComponent],
  imports: [
    AuthRoutingModule,
    FormsModule,
    NavBarComponent
],
  exports: [LoginComponent]
})
export class AuthModule { }
