import { Quiz } from './../models/quiz';
import { QuizService } from './../services/quiz.service';
import { UserService } from './../services/user.service';
import { User } from './../models/user';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ScoreService } from '../score.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import {MatAutocompleteSelectedEvent, MatChipInputEvent} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  quizPopularityData = [];
  quizSummaryData = [];
  quizColumnNames = ['Quiz', 'Popularity'];
  myColumnNames = ['Quiz','Average'];
  scoreData: number[] = [];
  myOptions = { 
    hAxis: { 
        slantedText: true, 
        slantedTextAngle: 45 
    } 
};

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  quizName = new FormControl();
  filteredQuizzes: string[][];
  quizNames: string[] = [];
  allQuizNames: string[] = [];
  @ViewChild('quizNameInput') quizNameInput: ElementRef;

  currentUser: User;
  private currentQuiz:Quiz;
  users: User[] = [];
  allQuiz :any[];
  allPlayers: any[];
  isDesc: boolean = false;
  deleted:any[] =[];
  column: string = '';
  direction: number;
  quizzes = [
    {
      "id": 1,
      "name": "Asp.Net Quiz",
      "description": "Asp.Net Quiz (contains webform, mvc, web API, etc.)",
      "createdBy": "Neeraj",
      "maxMarks": 11,
      "createdOn": "2018073",
      "time": 15,
      "questions": [
        {
          "id": 1010,
          "name": "ASP.NET webform separates the HTML output from program logic using a feature named as",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Exception",
              "isAnswer": false
            },
            {
              "name": "Code-behind",
              "isAnswer": true
            },
            {
              "name": "Code-front",
              "isAnswer": false
            },
            {
              "name": "None of the above",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1011,
          "name": "The feature in ASP.NET 2.0 that is used to fire a normal postback to a different page in the application is called",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Theme",
              "isAnswer": false
            },
            {
              "name": "Code-front",
              "isAnswer": false
            },
            {
              "name": "Cross Page Posting",
              "isAnswer": true
            },
            {
              "name": "None of the above",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1012,
          "name": "What class does the ASP.NET Web Form class inherit from by default?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "System.Web.UI.Page",
              "isAnswer": true
            },
            {
              "name": "System.Web.UI.Form",
              "isAnswer": false
            },
            {
              "name": "System.Web.GUI.Page",
              "isAnswer": false
            },
            {
              "name": "System.Web.Form",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1013,
          "name": "What does MVC stand for?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Model View Controller",
              "isAnswer": true
            },
            {
              "name": "Maximum Virtual Control",
              "isAnswer": false
            },
            {
              "name": "Microsoft Visual Core",
              "isAnswer": false
            },
            {
              "name": "None of the above",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1014,
          "name": "Which of the following does NOT require type casting?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Session",
              "isAnswer": false
            },
            {
              "name": "TempData",
              "isAnswer": false
            },
            {
              "name": "ViewData",
              "isAnswer": false
            },
            {
              "name": "ViewBag",
              "isAnswer": true
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1015,
          "name": "Which is the correct order of Page life-cycle in asp.net webform?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Init, PreRender, Load",
              "isAnswer": false
            },
            {
              "name": "Load, PreRender, Init",
              "isAnswer": false
            },
            {
              "name": "Init, Load, PreRender",
              "isAnswer": true
            },
            {
              "name": "None of the above",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1016,
          "name": "Which of these data source controls do not implement caching?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "ObjectDataSource",
              "isAnswer": false
            },
            {
              "name": "LinqDataSource",
              "isAnswer": true
            },
            {
              "name": "SqlDataSource",
              "isAnswer": false
            },
            {
              "name": "XmlDataSource",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1017,
          "name": "Which tag asp:Label control by default renders to?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "div",
              "isAnswer": false
            },
            {
              "name": "span",
              "isAnswer": true
            },
            {
              "name": "body",
              "isAnswer": false
            },
            {
              "name": "label",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1018,
          "name": "Which method do you use to explicitly kill a user's session?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Session.Terminate()",
              "isAnswer": false
            },
            {
              "name": "Session.TimeOut()",
              "isAnswer": false
            },
            {
              "name": "Session.Abondon()",
              "isAnswer": true
            },
            {
              "name": "Session.Kill()",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1019,
          "name": "Which of the following object is ideal for keeping data alive for a single request?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "HttpContext",
              "isAnswer": true
            },
            {
              "name": "Session",
              "isAnswer": false
            },
            {
              "name": "Cookies",
              "isAnswer": false
            },
            {
              "name": "SqlServer",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1020,
          "name": "ASP.NET is ?",
          "questionTypeId": 2,
          "options": [
            {
              "name": "Best",
              "isAnswer": true
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        }
      ],
      "popularity": 10
    },
    {
      "id": 2,
      "name": "C# Quiz",
      "description": "C# Quiz (contains information.)",
      "popularity": 8,
      "createdBy": "Farzeem",
      "maxMarks": 7,
      "createdOn": "2018073",
      "time": 10,
      "questions": [
        {
          "id": 1010,
          "name": "Which of the following assemblies can be stored in Global Assembly Cache?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Private Assemblies",
              "isAnswer": false
            },
            {
              "name": "Friend Assemblies",
              "isAnswer": false
            },
            {
              "name": "Public Assemblies",
              "isAnswer": false
            },
            {
              "name": "Shared Assemblies",
              "isAnswer": true
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1011,
          "name": "Which of the following .NET components can be used to remove unused references from the managed heap?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Language Infrastructure",
              "isAnswer": false
            },
            {
              "name": "CLR",
              "isAnswer": false
            },
            {
              "name": "Garbage Collector",
              "isAnswer": true
            },
            {
              "name": "Class Loader",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1012,
          "name": "Which of the following utilities can be used to compile managed assemblies into processor-specific native code?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "gacutil",
              "isAnswer": false
            },
            {
              "name": "ngen",
              "isAnswer": true
            },
            {
              "name": "dumpbin",
              "isAnswer": false
            },
            {
              "name": "ildasm",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1013,
          "name": "Which of the following is NOT an Arithmetic operator in C#.NET?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "** (Double Star)",
              "isAnswer": true
            },
            {
              "name": "+ (Plus)",
              "isAnswer": false
            },
            {
              "name": "/ (Divide)",
              "isAnswer": false
            },
            {
              "name": "% (Modulo)",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1014,
          "name": "Which of the following statements is correct about an interface used in C#.NET?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "If a class implements an interface partially, then it should be an abstract class.",
              "isAnswer": true
            },
            {
              "name": "A class cannot implement an interface partially.",
              "isAnswer": false
            },
            {
              "name": "An interface can contain static methods.",
              "isAnswer": false
            },
            {
              "name": "An interface can contain static data.",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1015,
          "name": "What does the term <strong>immutable</strong> means in term of string objects?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "We can modify characters included in the string",
              "isAnswer": false
            },
            {
              "name": "We cannot modify characters contained in the string",
              "isAnswer": true
            },
            {
              "name": "We cannot perform various operation of comparison, inserting, appending etc",
              "isAnswer": false
            },
            {
              "name": "None of the above",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        },
        {
          "id": 1016,
          "name": "Which of the following is NOT a .NET Exception class?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Exception",
              "isAnswer": false
            },
            {
              "name": "StackMemoryException",
              "isAnswer": true
            },
            {
              "name": "DivideByZeroException",
              "isAnswer": false
            },
            {
              "name": "InvalidOperationException",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018072",
          "explanation": "LOL"
        }
      ]
    },
    {
      "id": 3,
      "name": "Design Patterns",
      "description": "Design Patterns Quiz including solid principles.",
      "questions": [
        {
          "id": 1010,
          "name": "In SOLID principle, O stands for:",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Objects and Variables",
              "isAnswer": false
            },
            {
              "name": "Open-Closed Principle",
              "isAnswer": true
            },
            {
              "name": "Object Oriented Programming",
              "isAnswer": false
            },
            {
              "name": "OutOfMemory Exception",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018075",
          "explanation": "LOL"
        },
        {
          "id": 1011,
          "name": "Which pattern defines an interface for creating an object, but let the subclasses decide which class to instantiate. It let the instantiation differ to subclasses.",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Factory Method",
              "isAnswer": true
            },
            {
              "name": "Abstract Factory",
              "isAnswer": false
            },
            {
              "name": "Builder",
              "isAnswer": false
            },
            {
              "name": "Prototype",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018075",
          "explanation": "LOL"
        },
        {
          "id": 1012,
          "name": "Which pattern attach the additional responsibilities to an object dynamically.It provides a flexible alternative to subclassing for extending functionality.",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Chain of responsibility",
              "isAnswer": false
            },
            {
              "name": "Adapter",
              "isAnswer": false
            },
            {
              "name": "Decorator",
              "isAnswer": true
            },
            {
              "name": "Composite",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018075",
          "explanation": "LOL"
        },
        {
          "id": 1013,
          "name": "Singleton pattern is a (according to Gang of Four):",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Creational Pattern",
              "isAnswer": true
            },
            {
              "name": "Behavioural Pattern",
              "isAnswer": false
            },
            {
              "name": "Structural Pattern",
              "isAnswer": false
            },
            {
              "name": "None of the above",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018075",
          "explanation": "LOL"
        },
        {
          "id": 1014,
          "name": "MVC, MVP and MVVP are related to which layer of software architecture?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Data Access Layer",
              "isAnswer": false
            },
            {
              "name": "Business/Service Layer",
              "isAnswer": false
            },
            {
              "name": "Third Party Library",
              "isAnswer": false
            },
            {
              "name": "User Interface",
              "isAnswer": true
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018075",
          "explanation": "LOL"
        },
        {
          "id": 1015,
          "name": "Which pattern defines a family of algorithms, encapsulate each one, and make them interchangeable. It lets the algorithm vary independently from clients that use it?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Template method",
              "isAnswer": false
            },
            {
              "name": "Decorator",
              "isAnswer": false
            },
            {
              "name": "Strategy",
              "isAnswer": true
            },
            {
              "name": "Visitor",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018075",
          "explanation": "LOL"
        },
        {
          "id": 1016,
          "name": "Which pattern define one to many dependency between objects so that when one object change state, all its dependent are notified and updated automatically?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Chain of responsibility",
              "isAnswer": false
            },
            {
              "name": "Observer Pattern",
              "isAnswer": true
            },
            {
              "name": "Event Notification",
              "isAnswer": false
            },
            {
              "name": "Deligate Pattern",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018075",
          "explanation": "LOL"
        },
        {
          "id": 1017,
          "name": "Which pattern ensures a class has only one instance, and provide a global access point to it?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Single Class Factory",
              "isAnswer": false
            },
            {
              "name": "Singleton",
              "isAnswer": true
            },
            {
              "name": "Proxy",
              "isAnswer": false
            },
            {
              "name": "Flyweight",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018075",
          "explanation": "LOL"
        },
        {
          "id": 1018,
          "name": "Which pattern provides a way to access the elements of an aggregate object sequentially without exposing its underlying representation?",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Iterator",
              "isAnswer": true
            },
            {
              "name": "Visitor",
              "isAnswer": false
            },
            {
              "name": "Composite",
              "isAnswer": false
            },
            {
              "name": "Command",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018075",
          "explanation": "LOL"
        },
        {
          "id": 1019,
          "name": "In SOLID principles 'S' stands for:",
          "questionTypeId": 1,
          "options": [
            {
              "name": "Single Responsibility",
              "isAnswer": true
            },
            {
              "name": "Session",
              "isAnswer": false
            },
            {
              "name": "Strength",
              "isAnswer": false
            },
            {
              "name": "SqlServer",
              "isAnswer": false
            }
          ],
          "hasNext": false,
          "nextQuestion": "",
          "createdAt": "2018075",
          "explanation": "LOL"
        }
      ],
      "createdBy": "Utkarsh",
      "maxMarks": 10,
      "createdOn": "2018075",
      "time": 15,
      "popularity": 13
    }
  ]

  constructor(private router: Router, private userService: UserService, private quizService: QuizService, private scoreService: ScoreService) { 
    this.currentUser = userService.getCurrentUser();
    // var maxPopularity = Math.max.apply(Math,this.quizzes.map(function(o) {return o.popularity}))
    // this.quizNames = [this.quizzes[this.quizzes.findIndex(q => q.popularity == maxPopularity)].name];
    // this.filteredQuizzes = this.quizName.valueChanges.pipe(
    //   startWith(null),
    //   map((qname: string | null) => qname ? this._filter(qname) : this.allPlayers.slice()));
  }

  ngOnChanges(){
    this.currentUser = this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.loadAllUsers();
    this.allQuiz = this.quizService.getAllQuiz();
    this.allPlayers = this.userService.getAllPlayers();
    this.populateQuizNames(this.allQuiz);
    this.populateQuizPopularityData(this.allQuiz);
    this.populateQuizSummaryData(this.allPlayers);
    this.filteredQuizzes = [];
    this.filteredQuizzes.push(this.allPlayers);
  }

  populateQuizPopularityData(allQuiz){
    for (let i = 0; i < allQuiz.length; i++) {
      this.quizPopularityData.push([allQuiz[i].name,allQuiz[i].popularity]);
    }
  }

  populateQuizNames(allQuiz){
    for (let i = 0; i < allQuiz.length; i++) {
      this.allQuizNames.push(allQuiz[i].name);
    }
  }

  populateQuizSummaryData(allPlayers){
    this.scoreData = new Array(this.allQuizNames.length);
    this.scoreData.fill(0);
    allPlayers.forEach(player => {
      player.forEach(p => {
        this.scoreData[p.quizId-1] += p.score; 
      });
    });
    //console.log(this.scoreData);
    for (let i = 0; i < this.allQuiz.length; i++) {
      this.quizSummaryData.push([this.allQuiz[i].name,this.scoreData[this.allQuiz[i].id-1]/this.allQuiz[i].popularity]);
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.quizNames.push(value.trim());
    }

    if (input) {
      input.value = '';
    }

    this.quizName.setValue(null);
  }

  remove(qname: string): void {
    const index = this.quizNames.indexOf(qname);

    if (index >= 0) {
      this.quizNames.splice(index, 1);
    }
    this.allQuizNames.push(qname);
    this.chipSelectionChanged();
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.quizNames.push(event.option.viewValue);
    let index = this.allQuizNames.indexOf(event.option.viewValue);
    this.deleted.push(event.option.viewValue);
    this.allQuizNames.splice(index,1);
    console.log(this.deleted);
    this.quizNameInput.nativeElement.value = '';
    this.quizName.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    //console.log(filterValue);
    let tempList:string[]=[];
    if(this.allPlayers !== null){
      let i=0;
    this.allPlayers.forEach(player => {
      tempList.push(player.filter(p=>{
        //console.log(p);
        return p.quizTitle.toLowerCase().indexOf(filterValue) !== -1;
      }));
      //console.log(tempList);
    });
    }
    //console.log(tempList);
    return tempList;
    
    // return this.allPlayers.filter(player => player.forEach(p => {
    //   console.log(p.quizTitle.toLowerCase().indexOf(filterValue));
    //   return p.quizTitle.toLowerCase().indexOf(filterValue) !== -1;
    // }));
      
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => { 
        this.users = users; 
    });
  }

  takeQuiz(qname){
    this.router.navigate(['/quiz/'+qname]);
  }

  addQuiz(){
    this.router.navigate(['/addquiz']);
  }

  sort(property){
    this.isDesc = !this.isDesc; //change the direction    
    this.column = property;
    this.direction = this.isDesc ? 1 : -1;
  }

  disableQuizAttempted(quizName){
    let disableQuiz:boolean = false;
    if(localStorage.getItem(this.userService.getCurrentUser().username) !== null)
    {
      let username = this.scoreService.getScore();
      for (let i = 0; i < username.length; i++) {
        if(username[i].quizTitle === quizName){
          disableQuiz = true;
        }
      }
    }
    return disableQuiz;
  }
  
  backToLogin(){
    this.router.navigate(['/login']);
  }

  chipSelectionChanged(){
    if(this.quizNames.length==0){
      this.filteredQuizzes=[]
      this.filteredQuizzes.push(this.allPlayers);
    }
    else{
      //this.filteredQuizzes = this.quizNames.map((qname: string | null) => this._filter(qname));
      this.filteredQuizzes=[]
      this.quizNames.forEach(q=>{
        var temp = this._filter(q)
        this.filteredQuizzes.push(temp)
        //console.log(temp);
      })
      //console.log(this.filteredQuizzes);
    }
    //console.log(this.filteredQuizzes);
  }
  
}
