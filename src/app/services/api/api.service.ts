import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'http://localhost:8080/v1';

  publishSurveyUrl = `${this.url}/api/surveys`;

  constructor(private http: HttpClient) {}

  publishSurvey(surveyJson: any) {
    console.log(surveyJson);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post(this.publishSurveyUrl, surveyJson, { headers }).pipe(
      catchError(error => {
        console.error('Error occurred while publishing survey:', error);
        throw error;
      })
    ).subscribe();
  }
}