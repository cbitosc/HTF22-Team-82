import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { UserService } from './../services/user.service';
import { QuizService } from './../services/quiz.service';
import { Quiz } from './../models/quiz';
import { Question } from './../models/question';
import { Option } from './../models/option';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generate-quiz',
  templateUrl: './generate-quiz.component.html',
  styleUrls: ['./generate-quiz.component.css']
})
export class GenerateQuizComponent implements OnInit {

  options: Option[] = [];
  option: Option;
  questions: Question[] = [];
  mcqQuestion: Question;
  quiz: Quiz;
  timeChange: boolean = false;
  categories = [
    {
      id: 9,
      name: 'General Knowledge'
    },
    {
      id: 10,
      name: 'Entertainment: Books'
    },
    {
      id: 11,
      name: 'Entertainment: Film'
    },
    {
      id: 12,
      name: 'Entertainment: Music'
    },
    {
      id: 13,
      name: 'Entertainment: Musicals and Theatre'
    },
    {
      id: 14,
      name: 'Entertainment: Television'
    },
    {
      id: 15,
      name: 'Entertainment: Video Games'
    },
    {
      id: 16,
      name: 'Entertainment: Board Games'
    },
    {
      id: 17,
      name: 'Science and Nature'
    },
    {
      id: 18,
      name: 'Science: Computers'
    },
    {
      id: 19,
      name: 'Science: Mathematics'
    },
    {
      id: 20,
      name: 'Mythology'
    },
    {
      id: 21,
      name: 'Sports'
    },
    {
      id: 22,
      name: 'Geography'
    },
    {
      id: 23,
      name: 'History'
    },
    {
      id: 24,
      name: 'Politics'
    },
    {
      id: 25,
      name: 'Art'
    },
    {
      id: 26,
      name: 'Celebrities'
    },
    {
      id: 27,
      name: 'Animals'
    },
    {
      id: 28,
      name: 'Vehicles'
    },
    {
      id: 29,
      name: 'Entertainment: Comics'
    },
    {
      id: 30,
      name: 'Science: Gadegets'
    },
    {
      id: 31,
      name: 'Entertainment: Japanese Anime and Manga'
    },
    {
      id: 32,
      name: 'Entertainment: Cartoon and Animations'
    }
  ]
  difficulties = [
    {
      name: 'Easy',
      value: 'easy'
    },
    {
      name: 'Medium',
      value: 'medium'
    },
    {
      name: 'Hard',
      value: 'hard'
    }
  ]
  genQuiz;
  quizzes: Quiz[] = [];
  currentUser;
  private url:string = 'https://opentdb.com/api.php';

  constructor(private userService: UserService,public service: QuizService,private router: Router, public toastr: ToastrManager) {
    this.currentUser = userService.getCurrentUser();
  }

  ngOnInit() {
    this.quizzes = this.service.getAllQuiz();
  //   this.service.getQuiz(this.url)
  //   .subscribe(posts =>{
  //     this.lol = posts;
  //     console.log(this.lol);
  //   }, 
  //   error =>{
  //     alert('An unexpected error occured');
  //     console.log(error);
  // })
  }

  onTimeInputChange(){
    this.timeChange = !this.timeChange;
  }

  submitQuiz(value){
    let generateURL = this.url+'?amount='+value.amount+'&category='+value.category+'&difficulty='+value.difficulty+'&type=multiple';
    this.service.generateQuiz(generateURL)
    .subscribe(response => {
      this.genQuiz = response;
      this.addQuiz(this.genQuiz,value);
    })
  }

  addQuiz(quiz,quizForm){
    for (let i = 0; i < quiz.results.length; i++) {
      this.questions.push(this.setQuestion(quiz.results[i].question,quiz.results[i].incorrect_answers,quiz.results[i].correct_answer,quiz.results[i].category))
    }
    this.quiz = new Quiz((this.quizzes.length > 0 ? this.quizzes.length+1 : 1),quizForm.quizTitle,quizForm.quizDescription,this.currentUser.username,new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),0,this.questions.length,quizForm.timeLimit,this.questions) 
    this.quizzes.push(this.quiz);
    localStorage.setItem('allQuiz', JSON.stringify(this.quizzes));
  
    //navigate to home component
    this.router.navigate(['/']);
  }

  showSuccess() {
    this.toastr.successToastr('Quiz Added Succesfully', 'Success!');
  }
  

  setQuestion(questionTitle, options, rightAnswer, explanation): Question{
    this.options = [];
    for (let i = 0; i < options.length; i++) {
      this.option = new Option(options[i],false);
      this.options.push(this.option);
    }
    this.options.push(new Option(rightAnswer,true));
    this.mcqQuestion = new Question((this.questions.length > 0 ? this.questions.length+1 : 1),questionTitle,new Date().getUTCFullYear()+"0"+new Date().getMonth()+new Date().getDay(),1,false,null,this.options,explanation)
    return this.mcqQuestion;
  }
}
