import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-responses',
  templateUrl: './list-responses.component.html',
  styleUrls: ['./list-responses.component.css'],
})
export class ListResponsesComponent implements OnInit {
  surveyId: string | null = null;
  responseCount: number = 0;
  responses: any[] = [];
  currentPage: number = 0;
  pageSize: number = 2;
  totalPages: number = 0;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.surveyId = params.get('surveyId');
      this.responseCount = parseInt(params.get('responseCount') || '0');
      this.totalPages = Math.ceil(this.responseCount / this.pageSize);
      if (this.surveyId) {
        this.loadResponses();
      }
    });
  }

  loadResponses() {
    if (this.surveyId) {
      this.apiService
        .getSurveyResponses(this.surveyId, this.currentPage, this.pageSize)
        .subscribe((response: any) => {
          this.responses = response || [];
        });
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadResponses();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadResponses();
    }
  }
}
