import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ScoreService } from '../score.service';
import { UserService } from '../services';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  
  quizName: string;
  results: any[];
  currentResult: any;
  constructor(private route: ActivatedRoute, private router: Router, private scoreService: ScoreService, private userService: UserService, private quizService: QuizService) {
   }

  ngOnInit() {
    this.quizName = this.route.snapshot.paramMap.get('qname');
    if( localStorage.getItem('currentUser') !== null)
      this.results = this.scoreService.getScore();
    for (let i = 0; i < this.results.length; i++) {
      if(this.results[i].quizTitle === this.quizName)
      {
        this.currentResult = this.results[i];  
      }
    }
  }

  backToHome(){
    this.router.navigate(['/profile']);
  }

}
