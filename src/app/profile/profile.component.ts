import { ConfirmationDialogComponent } from './../confirmation-dialog/confirmation-dialog.component';
import { Router } from '@angular/router';
import { QuizService } from './../services/quiz.service';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  dialogRef: MatDialogRef<ConfirmationDialogComponent>;
  data:any;
  currentUser;
  allQuiz: any[] = [];
  quizCreated: any[] = [];
  playerScores: any[] = [];
  playerData = [];
  masterData = [];
  myColumnNames = ['Quiz','Performance'];
  quizColumnNames = ['Quiz', 'Popularity'];
  constructor(private router: Router,private userService: UserService, private quizService: QuizService, public dialog: MatDialog) {
    this.currentUser = userService.getCurrentUser();
   }

  ngOnInit() {
    if(localStorage.getItem(this.currentUser.username) !== null)
      this.playerScores = JSON.parse(localStorage.getItem(this.currentUser.username));
    else
      this.playerScores = [];
    this.allQuiz = this.quizService.getAllQuiz();
    for (let i = 0; i < this.allQuiz.length; i++) {
      if(this.allQuiz[i].createdBy === this.currentUser.username)
        this.quizCreated.push(this.allQuiz[i]);
    }
    if(this.currentUser.playerOrQm === 'Player')
      this.populatePlayerData(this.playerScores);
    else
      this.populateMasterData(this.allQuiz);

  }

  populatePlayerData(playerScores){
    for (let i = 0; i < playerScores.length; i++) {
      this.playerData.push([playerScores[i].quizTitle, playerScores[i].score/playerScores[i].answers.length])
    }
  }

  populateMasterData(allQuiz){
    for (let i = 0; i < allQuiz.length; i++) {
      if(this.currentUser.username === allQuiz[i].createdBy)
        this.masterData.push([allQuiz[i].name, allQuiz[i].popularity]);
    }
  }

  editQuiz(qname){
    this.router.navigate(['quiz/'+qname+'/edit'])
  }

  deleteQuiz(quiz){
    this.dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      disableClose: false
    });
    this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete " + quiz.name +" ?"

    this.dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.allQuiz.splice((this.allQuiz.indexOf(quiz)),1);
        this.quizCreated.splice((this.quizCreated.indexOf(quiz)),1);
        this.quizService.setAllQuiz(this.allQuiz);
      }
      this.dialogRef = null;
    });
  }
  
}
