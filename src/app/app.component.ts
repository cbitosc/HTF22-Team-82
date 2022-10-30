import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Quiz-App';

  check(){
    if(localStorage.getItem('currentUser') !== null)
      return true;
    else
      return false;
  }
}
