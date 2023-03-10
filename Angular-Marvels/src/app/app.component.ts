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
  buttonsOfMvButtonToggle = [
    {value: 'personagens', text: 'Personagens'},
    {value: 'historia', text: 'Histórias'},
    {value: 'eventos', text: 'Eventos'},
    {value: 'series', text: 'Séries'},
    {value: 'comics', text: 'Comics'},
    {value: 'criadores', text: 'Criadores'},
    {value: 'favoritos', text: 'Favoritos'},
    {value: 'curtidos', text: 'Curtidos'}
  ];  
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