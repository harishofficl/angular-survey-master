import { Component } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { AuthService } from '../../../services/auth/auth.service';


@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  
  surveys: { id: string, title: string, description: string, responseCount: number }[] = [];

  constructor(private apiService: ApiService, private authService: AuthService) { }

  ngOnInit() {
    this.apiService.getAdminSurveys(this.authService.currentUserId).subscribe((surveys: any) => {
      this.surveys = surveys;
    });
  }

}
