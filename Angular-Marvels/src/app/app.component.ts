/* app.component.ts */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {  
  isDarkTheme = false;
  pageTitle = 'Angular Marvels'
  constructor() {
    this.setThemeClass();
  }

  setThemeClass() {
    const body = document.querySelector('body');
    if (body) {
      if (this.isDarkTheme) {
        body.classList.add('dark-theme');
        body.classList.remove('light-theme');
      } else {
        body.classList.add('light-theme');
        body.classList.remove('dark-theme');
      }
    }
  }

  onThemeChanged(theme: boolean) {
    this.isDarkTheme = theme;
    this.setThemeClass();
  }
}