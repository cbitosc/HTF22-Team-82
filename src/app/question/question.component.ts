import { Question } from './../models/question';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewChild, QueryList } from '@angular/core';
import { NgForm } from '../../../node_modules/@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @ViewChild(QuestionComponent) question: QuestionComponent; 
  @Input() q: Question;
  @Output() valueChange = new EventEmitter();
  @Output() delQuestion = new EventEmitter();
  constructor() { }

  ngOnInit() {
    // this.formChanges = this.quizForm.form.valueChanges.subscribe(x => {
    //   console.log(x);
    // })
  }

  ngAfterViewInit() {

    // let jokes: QuestionComponent= this.question; 
    // console.log(this.q.id+" "+jokes);
    // this.question.forEach(element => {
    //   console.log(element.q.id);
    // });
  }

  ngOnDestroy() {
    //this.formChanges.unsubscribe();
  }

  valueChanged(event){
    console.log(event);
    //this.valueChange.emit();
  }

  deleteQuestion(question){
    this.delQuestion.emit(question);
  }
}
