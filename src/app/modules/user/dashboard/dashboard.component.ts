import { Component } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  surveys: any[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getAllSurveys().subscribe((surveys: any) => {
      this.surveys = surveys;
    });
  }
}
