import { NgModule } from '@angular/core';


import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { NavBarComponent } from "../../utils/nav-bar/nav-bar.component";
import { LoginComponent } from './login/login.component';


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
