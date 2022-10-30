import { Router } from '@angular/router';
import { speedDialFabAnimations } from './speed-dial-fab-animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-speed-dial-fab',
  templateUrl: './speed-dial-fab.component.html',
  styleUrls: ['./speed-dial-fab.component.css'],
  animations: speedDialFabAnimations
})
export class SpeedDialFabComponent {

  fabButtons = [
    {
      icon: 'create',
      text: 'Create'
    },
    {
      icon: 'create_new_folder',
      text: 'Generate'
    }
  ];
  buttons = [];
  fabTogglerState = 'inactive';

  constructor(private router: Router) { }

  showItems() {
    this.fabTogglerState = 'active';
    this.buttons = this.fabButtons;
  }

  hideItems() {
    this.fabTogglerState = 'inactive';
    this.buttons = [];
  }

  onToggleFab() {
    this.buttons.length ? this.hideItems() : this.showItems();
  }

  onClick(event){
    let data = event.target.firstChild.data;
    if(data === 'create')
      this.router.navigate(['/addquiz']);
    else if(data === 'create_new_folder')
      this.router.navigate(['/generate']);
  }
}
