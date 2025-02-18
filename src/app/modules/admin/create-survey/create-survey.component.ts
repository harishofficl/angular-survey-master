import { Component } from '@angular/core';

@Component({
  selector: 'app-create-survey',
  templateUrl: './create-survey.component.html',
  styleUrl: './create-survey.component.css',
})
export class CreateSurveyComponent {
  questions: number[] = [0];
  quesNumber: number = 1;

  addQuestion(index: number) {
    this.questions.splice(index + 1, 0, this.quesNumber);
    this.quesNumber++;
  }

  deleteQuestion(index: number) {
    if (this.questions.length > 1) {
      this.questions.splice(index, 1);
    }
  }
}
