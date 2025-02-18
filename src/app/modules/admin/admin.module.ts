import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListResponsesComponent } from './list-responses/list-responses.component';
import { ViewResponseComponent } from './view-response/view-response.component';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CreateQuestionComponent } from './utils/create-question/create-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    CreateSurveyComponent,
    DashboardComponent,
    ListResponsesComponent,
    ViewResponseComponent,
    CreateQuestionComponent,
  ],
  imports: [CommonModule, FormsModule, AdminRoutingModule, NavBarComponent, ReactiveFormsModule],
})
export class AdminModule {}
