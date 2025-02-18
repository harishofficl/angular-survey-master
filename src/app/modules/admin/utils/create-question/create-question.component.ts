import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrl: './create-question.component.css',
})
export class CreateQuestionComponent {
  selectedAnswerType: string = 'text';

  @Input() index!: number;
  @Output() add = new EventEmitter<number>(); 
  @Output() delete = new EventEmitter<number>();

  mcqOptions: any[] = [{}];
  checkboxOptions: any[] = [{}];


  addQuestion() {
    this.add.emit(this.index);
  }

  deleteQuestion() {
    this.delete.emit(this.index);
  }

  addMcqOption() {
    this.mcqOptions.push({});
  }

  addCheckboxOption() {
    this.checkboxOptions.push({});
  }

  deleteMcqOption(index: number) {
    if (this.mcqOptions.length > 1) {
      this.mcqOptions.splice(index, 1);
    }
  }

  deleteCheckboxOption(index: number) {
    if (this.checkboxOptions.length > 1) {
      this.checkboxOptions.splice(index, 1);
    }
  }

  blur(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    selectElement.blur();
  }
}
