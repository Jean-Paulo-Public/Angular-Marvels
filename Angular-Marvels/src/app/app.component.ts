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
  onThemeChanged(theme: boolean) {
    this.isDarkTheme = theme; // muda a variável de acordo com o evento recebido 
  }
}