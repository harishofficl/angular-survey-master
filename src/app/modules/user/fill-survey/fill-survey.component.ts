import { Component } from '@angular/core';
import { ApiService } from '../../../services/api/api.service';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-fill-survey',
  templateUrl: './fill-survey.component.html',
  styleUrl: './fill-survey.component.css',
})
export class FillSurveyComponent {
  survey: any = {};
  surveyId: string = '';
  responseForm!: FormGroup;
  surveyForm!: FormGroup;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private auth: AuthService
  ) {
    this.surveyForm = this.fb.group({
      id: [''],
      userId: [''],
      title: [''],
      description: [''],
      questions: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.surveyId = params.get('surveyId') || '';
    });
    this.getSurvey(this.surveyId);
  }

  get questions() {
    return this.surveyForm.get('questions') as FormArray;
  }

  get responses() {
    return this.responseForm.get('responses') as FormArray;
  }

  getQuestion(index: number): FormGroup {
    return this.questions.at(index) as FormGroup;
  }

  getResponse(index: number): FormGroup {
    return this.responses.at(index) as FormGroup;
  }

  getAnswer(i: number, j: number): FormControl{
    const answerArray = this.getQuestion(i).controls['answers'] as FormArray;
    return answerArray.at(j) as FormControl;
  }

  getSurvey(surveyId: string) {
    this.apiService.getSurvey(surveyId).subscribe((survey) => {
      this.survey = survey;
      this.generateSurveyFormBuilder();
    });
  }

  generateSurveyFormBuilder() {
    this.surveyForm.get('id')?.setValue(this.survey.id);
    this.surveyForm.get('userId')?.setValue(this.survey.userId);
    this.surveyForm.get('title')?.setValue(this.survey.title);
    this.surveyForm.get('description')?.setValue(this.survey.description);

    const questionArray = this.surveyForm.get('questions') as FormArray;
    this.survey.questions.forEach((question: any, index: number) => {
      let questionGroup!: FormGroup;
      // text || paragraph
      if (question.type === 'text' || question.type === 'paragraph') {
        questionGroup = this.fb.group({
          id: [index + 1],
          question: [question.question],
          answer: [''],
          type: [question.type],
          minLength: [question.minLength],
          maxLength: [question.maxLength],
          required: [question.required],
        });
        // number
      } else if (question.type === 'number') {
        questionGroup = this.fb.group({
          id: [index + 1],
          question: [question.question],
          answer: [''],
          type: [question.type],
          minValue: [question.minValue],
          maxValue: [question.maxValue],
          required: [question.required],
        });
        // radio
      } else if (question.type === 'radio') {
        questionGroup = this.fb.group({
          id: [index + 1],
          question: [question.question],
          type: [question.type],
          answer: [''],
          options: this.fb.array([]),
          required: [question.required],
        });

        const options = questionGroup.get('options') as FormArray;
        question.options.forEach((option: any) => {
          // options
          const optionControl = new FormControl(option);
          options.push(optionControl);
        });
        questionGroup.controls['options'] = options;

      }  else if (question.type === 'checkbox') {
        questionGroup = this.fb.group({
          id: [index + 1],
          question: [question.question],
          type: [question.type],
          answers: this.fb.array([]),
          options: this.fb.array([]),
          required: [question.required],
        });

        const options = questionGroup.get('options') as FormArray;
        const answers = questionGroup.get('answers') as FormArray;
        question.options.forEach((option: any) => {
          // options
          const optionControl = new FormControl(option);
          options.push(optionControl);

          // answers
          const answerControl = new FormControl(false);
          answers.push(answerControl);
        });
        questionGroup.controls['options'] = options;
        questionGroup.controls['answers'] = answers;
      }
      
      else if (question.type === 'file') {
        questionGroup = this.fb.group({
          id: [index + 1],
          question: [question.question],
          answer: [''],
          type: [question.type],
          maxFileSize: [question.maxFileSize],
          specifiedFileTypes: [question.specifiedFileTypes],
          fileTypes: this.fb.array([]),
          required: [question.required],
        });

        const fileTypes = questionGroup.get('fileTypes') as FormArray;
        question.fileTypes.forEach((fileType: string) => {
          // options
          const typeControl = new FormControl(fileType);
          fileTypes.push(typeControl);
        });
        questionGroup.controls['fileTypes'] = fileTypes;
      }
      questionArray.push(questionGroup);
    });
    this.surveyForm.controls['questions'] = questionArray;
  }


  submitResponse() {
    this.responseForm = this.fb.group({
      surveyId: [this.surveyId],
      userId: [this.auth.currentUser.id || ''],
      responderName: [this.auth.currentUserName],
      responses: this.fb.array([]),
    });
    
    this.questions.value.forEach((question: any) => {
      if (question.type === 'checkbox') {
        const selectedOptions = question.options.filter((_: any, index: number) => question.answers[index]);
        const responseGroup = this.fb.group({
          id: [question.id],
          question: [question.question],
          type: [question.type],
          options: [selectedOptions],
        });
        this.responses.push(responseGroup);
      } else if (question.type === 'file'){
        this.responses.push(
          this.fb.group({
            id: [question.id],
            question: [question.question],
            type: [question.type],
            answer: [question.answer.split("\\")[2]],
          })
        );
      } else {
        this.responses.push(
          this.fb.group({
            id: [question.id],
            question: [question.question],
            type: [question.type],
            answer: [question.answer],
          })
        );
      }
    });
    this.apiService.postResponse(this.responseForm.value);
  }
}
