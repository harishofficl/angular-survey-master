import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'http://localhost:8080/v1';

  constructor(private http: HttpClient) {
  }

  // POST /api/surveys
  publishSurvey(surveyJson: any) {
    const url = `${this.url}/api/surveys`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(url, surveyJson, { headers }).pipe(
      catchError(error => {
        console.error('Error occurred while publishing survey:', error);
        throw error;
      })
    ).subscribe();
  }

  // GET /api/surveys/user?userId={userId}
  getAdminSurveys(adminId: string) {
    const url = `${this.url}/api/surveys/user?userId=${adminId}`;
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Error occurred while fetching surveys:', error);
        throw error;
      })
    );
  }

  // GET /api/responses/survey?surveyId={surveyId}
  getSurveyResponses(surveyId: string, page: number = 0, size: number = 2) {
    const url = `${this.url}/api/responses/survey?surveyId=${surveyId}&page=${page}&size=${size}`;
    return this.http.get(url).pipe(
      catchError(error => {
        console.error('Error occurred while fetching responses:', error);
        throw error;
      })
    );
  }
}