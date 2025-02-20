import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../../../services/api/api.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css',
})
export class CreateSurveyComponent {
  surveyForm: FormGroup;

  constructor(private fb: FormBuilder, private apiService: ApiService, private auth: AuthService) {
    this.surveyForm = this.fb.group({
      title: [''],
      description: [''],
      userId: [auth.currentUserName || ''],
      questions: this.fb.array([this.createQuestion()]),
    });
  }

  createQuestion() {
    const question = this.fb.group({
      id: [],
      question: [''],
      type: ['text'],
      required: [false],
      minLength: [''],
      maxLength: [''],
    });

    question.get('type')?.valueChanges.subscribe((type) => {
      this.updateQuestion(question, type);
    });

    return question;
  }

  private updateQuestion(question: FormGroup, type: string | null) {
    [
      'options',
      'minLength',
      'maxLength',
      'minValue',
      'maxValue',
      'maxFileSize',
      'specifiedFileTypes',
      'fileTypes',
    ].forEach((field) => {
      if (question.contains(field)) {
        question.removeControl(field);
      }
    });

    switch (type) {
      case 'text':
      case 'paragraph':
        question.addControl('minLength', new FormControl(''));
        question.addControl('maxLength', new FormControl(''));
        break;

      case 'number':
        question.addControl('minValue', new FormControl(''));
        question.addControl('maxValue', new FormControl(''));
        break;

      case 'radio':
      case 'checkbox':
        question.addControl('options', this.fb.array(['']));
        break;

      case 'file':
        question.addControl('specifiedFileTypes', new FormControl(false));
        question.addControl('maxFileSize', new FormControl(5));
        question.addControl('fileTypes', this.fb.array([]));
        break;

      default:
        break;
    }
  }

  get questions(): FormArray {
    return this.surveyForm.get('questions') as FormArray;
  }

  getQuestion(index: number): FormGroup {
    return this.questions.controls[index] as FormGroup;
  }

  addQuestion(index: number) {
    this.questions.insert(index + 1, this.createQuestion());
  }

  deleteQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.removeAt(index);
    }
  }

  publishSurvey() {

    this.questions.controls.forEach((question, index) => {
      question.get('id')?.setValue(index + 1);
    });

    const surveyJson = JSON.stringify(this.surveyForm.value);
    this.apiService.publishSurvey(surveyJson);
    Swal.fire({
      icon: 'success',
      title: 'Survey Published!',
      text: 'You have successfully published the survey!',
    });
  }
}
