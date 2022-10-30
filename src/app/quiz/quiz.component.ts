import { Quiz } from './../models/quiz';
import { QuestionComponent } from './../question/question.component';
import { QuizService } from './../services/quiz.service';
import { UserService } from './../services/user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewChildren, QueryList } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})

export class QuizComponent implements OnInit {

  //@ViewChild(QuestionComponent) question:QuestionComponent;
  @ViewChildren(QuestionComponent) question:QueryList<QuestionComponent>;

  qname: string;
  score: number;
  currentUser;
  answers: Answer[] = [];
  interval;
  timeLeft: number;
  answer : Answer;
  result :Result;
  results: Result[] = [];
  isQuizStarted: boolean = false;
  quiz: Quiz;
  allQuiz: Quiz[];
  allPlayers: any[] = [];

  constructor(private router: Router, private route: ActivatedRoute,private userService: UserService, private quizService: QuizService, public toastr: ToastrManager) { 
    this.currentUser = userService.getCurrentUser();
  }

  ngAfterViewInit() {

    // let jokes: QuestionComponent[] = this.question.toArray(); 
    // console.log(jokes);
    // this.question.forEach(element => {
    //   console.log(element.q.id);
    // });
  }

  ngOnInit() {
    this.qname = this.route.snapshot.paramMap.get('qname');
    this.allQuiz = this.quizService.getAllQuiz();
    
    for (let i = 0; i < this.allQuiz.length; i++) {
      if(this.allQuiz[i].name === this.qname)
        this.quiz = this.allQuiz[i];
    }
    this.allPlayers = this.userService.getAllPlayers();
  }
  
  calculateScore(form,quiz){
    this.score = 0;
    for (let i = 0; i < quiz.questions.length; i++) {
      for (let j = 0; j < quiz.questions[i].options.length; j++) {
        if(quiz.questions[i].options[j].isAnswer === true){
          this.answer = {
            quesId: quiz.questions[i].id,
            quesName: quiz.questions[i].name,
            selectedAnswer: form[`question[${quiz.questions[i].id}]`],
            rightAnswer: quiz.questions[i].options[j].name,
            explanation: quiz.questions[i].explanation
          }
          this.answers.push(this.answer);
          
          if(quiz.questions[i].options[j].name === form[`question[${quiz.questions[i].id}]`]){
            this.score++;
          }
        }
      }
    }
    
    this.result = {
      pid: this.currentUser.id,
      pname: this.currentUser.username,
      attemptedAt: new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),
      quizId: quiz.id,
      quizTitle: quiz.name,
      answers: this.answers,
      score: this.score
    }

    if(this.allPlayers === null){
      this.allPlayers = [];
      if(localStorage.getItem(this.currentUser.username) === null){
        this.results.push(this.result);
        localStorage.setItem(this.currentUser.username,JSON.stringify(this.results));
        this.allPlayers.push(this.results);
        console.log(this.allPlayers);
        localStorage.setItem('allPlayers',JSON.stringify(this.allPlayers));
      }
      else{
        var oldItems = JSON.parse(localStorage.getItem(this.currentUser.username));
        oldItems.push(this.result);
        localStorage.setItem(this.currentUser.username, JSON.stringify(oldItems));
        this.allPlayers.push(oldItems);
        console.log(this.allPlayers);
        localStorage.setItem('allPlayers',JSON.stringify(this.allPlayers));
      }
    }
    else{
      if(localStorage.getItem(this.currentUser.username) === null){
        this.results.push(this.result);
        localStorage.setItem(this.currentUser.username,JSON.stringify(this.results));
        this.allPlayers.push(this.results);
        console.log(this.allPlayers);
        localStorage.setItem('allPlayers',JSON.stringify(this.allPlayers));
      }
      else{
        let index;
        let leave:boolean = true;
        this.allPlayers.forEach(player => {
          player.forEach(p => {
            if(p.pname === this.currentUser.username && leave){
              player.push(this.result);
              leave= false;
            }
          });
        });
        var oldItems = JSON.parse(localStorage.getItem(this.currentUser.username));
        oldItems.push(this.result);
        localStorage.setItem(this.currentUser.username, JSON.stringify(oldItems));
        //console.log(this.allPlayers);
        localStorage.setItem('allPlayers',JSON.stringify(this.allPlayers));
      }
    }
    this.router.navigate(['quiz/'+quiz.name+'/score']);
  }
 
  onSubmit(form){
    this.calculateScore(form,this.quiz);
    this.updatePopularity(this.quiz.name);
  }

  loadQuiz(){
    this.isQuizStarted = !this.isQuizStarted;
  }

  startTimer(time){
    this.timeLeft = time;
    this.interval = setInterval(() => {
      if(time > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = time;
      }
    },1000)
  }

  showSuccess() {
    this.toastr.successToastr('Quiz Submitted Succesfully', 'Success!');
  }

  backToHome(){
    this.router.navigate(['/']);
  }

  updatePopularity(qname){
    if(localStorage.getItem(this.currentUser.username) !== null)
    {
      for (let i = 0; i < this.allQuiz.length; i++) {
        if(this.allQuiz[i].name === qname)
          {
            this.quiz = this.allQuiz[i];
            this.allQuiz.splice(i,1);
            this.quiz.popularity++;
          }
      }
      this.allQuiz.push(this.quiz);
      localStorage.setItem('allQuiz', JSON.stringify(this.allQuiz));
    }
  }
}

interface Answer{
  quesId: string,
  quesName: string,
  selectedAnswer: string,
  rightAnswer: string,
  explanation: string
}

interface Result{
  pid: number,
  pname: string,
  attemptedAt: string,
  quizId: number,
  quizTitle: string,
  answers: Answer[],
  score: number
}
