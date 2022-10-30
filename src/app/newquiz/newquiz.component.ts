import { QuizService } from './../services/quiz.service';
import { UserService } from './../services/user.service';
import { Quiz } from './../models/quiz';
import { Option } from './../models/option';
import { Question } from './../models/question';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-newquiz',
  templateUrl: './newquiz.component.html',
  styleUrls: ['./newquiz.component.css']
})
export class NewquizComponent implements OnInit {

  currentUser;
  options: Option[] = [];
  option: Option;
  questions: Question[] = [];
  mcqQuestion: Question;
  valueQuestion: Question;
  nestedQuestions: any[] = [];
  quiz: Quiz;
  quizzes: any[] = [];
  createQuestion: boolean = false;
  hideAddBtn: boolean = false;
  preview:boolean = false;
  selectedQuestionType: string;
  nestedQuestionType: string[] = [];
  timeChange: boolean = false;
  
  constructor(private router: Router, private userService: UserService, private quizService: QuizService, public toastr: ToastrManager) {
    this.currentUser = userService.getCurrentUser();
   }

  ngOnInit() {
    this.quizzes = this.quizService.getAllQuiz();
  }

  addQuestion(){
    this.createQuestion = true;
    this.hideAddBtn = true;
  }

  selectQuestionChangeHandler (event: any) {
    this.selectedQuestionType = event.value;
    //console.log(event);
  }

  nestedQuestionChangeHandler(event,iterator){
    if(event.target.value === 'mcq')
      this.nestedQuestionType[iterator] = 'mcq'; 
    else  
      this.nestedQuestionType[iterator] = 'value';
  }

  onTimeInputChange(){
    this.timeChange = !this.timeChange;
  }

  arrayOne(n: number): any[] {
    return Array(n);
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

    this.createQuestion = ! this.createQuestion;
    this.hideAddBtn = ! this.hideAddBtn;
    this.selectedQuestionType = '';

  }

  submitValueQuestion(fvalue){
    this.options = [];
    this.option = new Option(fvalue.questionAnswer,true)
    this.options.push(this.option);

    this.valueQuestion = new Question((this.questions.length > 0 ? this.questions.length+1 : 1),fvalue.questionTitle,new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),2,false,null,this.options,fvalue.explanation);
    this.questions.push(this.valueQuestion);

    this.createQuestion = ! this.createQuestion;
    this.hideAddBtn = ! this.hideAddBtn;
    this.selectedQuestionType = '';    
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
  this.questions.push(this.nestedQuestions[0]);
  this.createQuestion = ! this.createQuestion;
  this.hideAddBtn = ! this.hideAddBtn;
  this.selectedQuestionType = '';  
  }

  deleteQuestion(question: Question){
    let index = this.questions.indexOf(question);
    this.questions.splice(index,1);
  }
  
  submitQuiz(quizForm){
  this.quiz = new Quiz((this.quizzes.length > 0 ? this.quizzes.length+1 : 1),quizForm.quizTitle,quizForm.quizDescription,this.currentUser.username,new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),0,this.questions.length,quizForm.timeLimit,this.questions) 
  this.quizzes.push(this.quiz);
  localStorage.setItem('allQuiz', JSON.stringify(this.quizzes));
  
  //navigate to home component
  this.router.navigate(['/']);
  }

  showSuccess() {
    this.toastr.successToastr('Quiz Added Succesfully', 'Success!');
  }
}
