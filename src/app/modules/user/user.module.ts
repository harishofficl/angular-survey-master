import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { HomeComponent } from './home/home.component';
import { FillSurveyComponent } from './fill-survey/fill-survey.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [HomeComponent, FillSurveyComponent, DashboardComponent],
  imports: [CommonModule, UserRoutingModule, NavBarComponent, ReactiveFormsModule],
})
export class UserModule {}
