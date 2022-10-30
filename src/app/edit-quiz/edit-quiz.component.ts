import { Quiz } from './../models/quiz';
import { Question } from './../models/question';
import { Option } from './../models/option';
import { AddQuestionComponent } from './../add-question/add-question.component';
import { QuizService } from './../services/quiz.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {

  qname: string;
  index: number;
  allQuiz: any[];
  currentQuiz: Quiz;
  quiz: Quiz;
  timeChange:boolean = false;
  options: Option[] = [];
  option: Option;
  questions: Question[] = [];
  mcqQuestion: Question;
  valueQuestion: Question;
  nestedQuestions: any[] = [];
  constructor(private route: ActivatedRoute, private router: Router, private quizService: QuizService, public dialog: MatDialog) { }

  ngOnInit() {
    this.qname = this.route.snapshot.paramMap.get('qname');
    this.allQuiz = this.quizService.getAllQuiz();
    for (let i = 0; i < this.allQuiz.length; i++) {
      if(this.allQuiz[i].name === this.qname){
        this.currentQuiz = this.allQuiz[i];
        this.index = i;
      }
    }
    this.questions = this.currentQuiz.questions;
  }

  onTimeInputChange(){
    this.timeChange = !this.timeChange;
  }

  openDialog(): void {
    const addDialog = this.dialog.open(AddQuestionComponent);

    addDialog.afterClosed().subscribe(result => {
        if(result.questionType==='value')
          this.submitValueQuestion(result);
        else if(result.questionType==='mcq')
          this.submitMcqQuestion(result);
        else
          this.submitNestedQuestion(result);
    });
  }

  submitMcqQuestion(fmcq){
    this.options = [];
    console.log(fmcq);
    for (let i = 0; i < fmcq.optionCount; i++) {
      this.option = new Option(fmcq[`optionValue[${i}]`],fmcq[`optionRight[${i}]`]);
      this.options.push(this.option);
    }

    this.mcqQuestion = new Question((this.questions.length > 0 ? this.questions.length+1 : 1),fmcq.questionTitle,new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),1,false,null,this.options,fmcq.explanation)
    this.questions.push(this.mcqQuestion);
  }

  submitValueQuestion(fvalue){
    this.options = [];
    this.option = new Option(fvalue.questionAnswer,true)
    this.options.push(this.option);

    this.valueQuestion = new Question((this.questions.length > 0 ? this.questions.length+1 : 1),fvalue.questionTitle,new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),2,false,null,this.options,fvalue.explanation);
    this.questions.push(this.valueQuestion);
  }

  submitNestedQuestion(fnested){
    this.options = [];
      if(fnested[`questionType${fnested.nestingLevel -1}`] === 'mcq')
      {
        for (let j = 0; j < fnested[`optionCount${fnested.nestingLevel -1}`]; j++) {
          this.option = new Option(fnested[`optionValue[${fnested.nestingLevel -1}][${j}]`],fnested[`optionRight[${fnested.nestingLevel -1}][${j}]`]);
          this.options.push(this.option);
        }
        this.nestedQuestions[fnested.nestingLevel -1] = new Question((this.questions.length > 0 ? this.questions.length+1 : 1),fnested[`questionTitle${fnested.nestingLevel -1}`],new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),1,false,null,this.options,fnested[`explanation${fnested.nestingLevel -1}`]);
    }
    else { //value
      this.options = [];
      this.option = new Option(fnested[`questionAnswer${fnested.nestingLevel -1}`],true)
      this.options.push(this.option);
      this.nestedQuestions[fnested.nestingLevel -1] = new Question((this.questions.length > 0 ? this.questions.length+1 : 1),fnested[`questionTitle${fnested.nestingLevel -1}`],new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),2,false,null,this.options,fnested[`explanation${fnested.nestingLevel -1}`]);
    }
    for (let i = fnested.nestingLevel-2; i >=0 ; i--) {
    this.options = [];
    if(fnested[`questionType${i}`] === 'mcq')
      {
        for (let j = 0; j < fnested[`optionCount${i}`]; j++) {
          this.option = new Option(fnested[`optionValue[${i}][${j}]`],fnested[`optionRight[${i}][${j}]`]);
          this.options.push(this.option);
        }
        this.nestedQuestions[i] = new Question((this.questions.length > 0 ? this.questions.length+1 : 1),fnested[`questionTitle${i}`],new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),1,true,this.nestedQuestions[i+1],this.options,fnested[`explanation${i}`]);
    }
    else { //value
      this.option = new Option(fnested[`questionAnswer${i}`],true)
      this.options.push(this.option);
      this.nestedQuestions[i] = new Question((this.questions.length > 0 ? this.questions.length+1 : 1),fnested[`questionTitle${i}`],new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),2,true,this.nestedQuestions[i+1],this.options,fnested[`explanation${i}`]);
    }
  }
  //console.log(fnested);
  this.questions.push(this.nestedQuestions[0]);
  }

  deleteQuestion(question: Question){
    //console.log(event);
    let index = this.questions.indexOf(question);
    this.questions.splice(index,1);
  }

  submitQuiz(quizForm){
    this.quiz = new Quiz(this.currentQuiz.id,quizForm.quizTitle,quizForm.quizDescription,this.currentQuiz.createdBy,new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),this.currentQuiz.popularity,this.questions.length,quizForm.timeLimit,this.questions) 
    this.allQuiz.splice(this.index,1);
    this.allQuiz.push(this.quiz);
    localStorage.setItem('allQuiz', JSON.stringify(this.allQuiz));
  }
}
