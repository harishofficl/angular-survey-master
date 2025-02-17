import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { CreateSurveyComponent } from './create-survey/create-survey.component';
import { ListResponsesComponent } from './list-responses/list-responses.component';
import { ViewResponseComponent } from './view-response/view-response.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'create-survey',
        component: CreateSurveyComponent,
      },
      {
        path: `list-responses`,
        component: ListResponsesComponent,
      },
      {
        path: 'view-response',
        component: ViewResponseComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
