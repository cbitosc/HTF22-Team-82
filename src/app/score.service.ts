import { UserService } from './services/user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  currentUser;
  constructor(private userService: UserService) {
      this.currentUser = userService.getCurrentUser();
   }

  getScore(){
    return JSON.parse(localStorage.getItem(this.userService.getCurrentUser().username))
  }
}
