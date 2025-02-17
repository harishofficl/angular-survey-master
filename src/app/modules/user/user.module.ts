import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { FillSurveyComponent } from './fill-survey/fill-survey.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from "../utils/nav-bar/nav-bar.component";

@NgModule({
  declarations: [HomeComponent, FillSurveyComponent, DashboardComponent],
  imports: [CommonModule, UserRoutingModule, NavBarComponent],
})
export class UserModule {}
