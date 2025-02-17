import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListResponsesComponent } from './list-responses/list-responses.component';
import { ViewResponseComponent } from './view-response/view-response.component';
import { NavBarComponent } from "../utils/nav-bar/nav-bar.component";

@NgModule({
  declarations: [
    HomeComponent,
    CreateSurveyComponent,
    DashboardComponent,
    ListResponsesComponent,
    ViewResponseComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, NavBarComponent],
})
export class AdminModule {}
