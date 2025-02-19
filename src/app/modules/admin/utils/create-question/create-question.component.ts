import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css'],
})
export class CreateQuestionComponent implements OnInit {
  @Input() index!: number;
  @Input() question!: FormGroup;
  @Output() add = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  onlySpecifiedFileTypes: boolean = false;
  selectedAnswerType: string = 'text';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  get options(): FormArray {
    return this.question.get('options') as FormArray;
  }

  get fileTypes(): FormArray {
    return this.question.get('fileTypes') as FormArray;
  }

  addOption() {
    this.options.push(this.fb.control(''));
  }

  deleteOption(index: number) {
    if (this.options.length > 1) {
      this.options.removeAt(index);
    }
  }

  addQuestion() {
    this.add.emit(this.index);
  }

  deleteQuestion() {
    this.delete.emit(this.index);
  }

  blur(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedAnswerType = this.question.get('type')?.value;
    console.log(this.selectedAnswerType);
    selectElement.blur();
  }

  toggleFileTypes() {
    this.onlySpecifiedFileTypes = !this.onlySpecifiedFileTypes;
    this.updateFileTypes();
  }

  updateFileTypes() {
    this.fileTypes.clear();
    if (this.onlySpecifiedFileTypes) {
      const checkboxes = document.querySelectorAll('.file-type-checkboxes input[type="checkbox"]:checked') as NodeListOf<HTMLInputElement>;
      checkboxes.forEach((checkbox) => {
        checkbox.value.split(',').forEach(val => {
          this.fileTypes.push(this.fb.control(val));
        });
      });
    }
  }
}
