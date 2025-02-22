import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = 'http://localhost:8080/v1';

  constructor(private http: HttpClient) {}

  private showSuccessMessage(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success',
      text: message,
    });
  }

  // Error alert
  private showErrorMessage(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
    });
  }

  // GET /api/surveys/${surveyId}
  getSurvey(surveyId: string) {
    const url = `${this.url}/api/surveys/${surveyId}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching survey:', error);
        throw error;
      })
    );
  }

  // GET /api/surveys?page=${page}&size=${size}
  getAllSurveys(page: number = 0, size: number = 15) {
    const url = `${this.url}/api/surveys?page=${page}&size=${size}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching surveys:', error);
        throw error;
      })
    );
  }

  // POST /api/surveys
  publishSurvey(surveyJson: any) {
    const url = `${this.url}/api/surveys`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post(url, surveyJson, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error occurred while publishing survey:', error);
          this.showErrorMessage('Failed to publish the survey. Please try again.');
          throw error;
        })
      )
      .subscribe(() => {
        this.showSuccessMessage('Survey published successfully!');
      });
  }

  // GET /api/surveys/user?userId={userId}
  getAdminSurveys(adminId: string) {
    const url = `${this.url}/api/surveys/user?userId=${adminId}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching surveys:', error);
        throw error;
      })
    );
  }

  // GET /api/responses/survey?surveyId={surveyId}?page={page}&size={size}
  getSurveyResponses(surveyId: string, page: number = 0, size: number = 2) {
    const url = `${this.url}/api/responses/survey?surveyId=${surveyId}&page=${page}&size=${size}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching responses:', error);
        throw error;
      })
    );
  }

  // GET /api/responses/${responseId}
  getResponse(responseId: string) {
    const url = `${this.url}/api/responses/${responseId}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error occurred while fetching response:', error);
        throw error;
      })
    );
  }

  // POST /api/responses
  postResponse(responseJson: any) {
    const url = `${this.url}/api/responses`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post(url, responseJson, { headers })
      .pipe(
        catchError((error) => {
          console.error('Error occurred while submitting response:', error);
          this.showErrorMessage('Failed to submit the response. Please try again.');
          throw error;
        })
      )
      .subscribe(() => {
        this.showSuccessMessage('Response submitted successfully!');
      });
  }
}
