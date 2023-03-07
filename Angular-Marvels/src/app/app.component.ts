import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Angular Marvels';
  isDarkTheme = false;
  emoji = '&#x1F319;'; // começa com o emoji da lua
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    // alterna o emoji de acordo com o tema
    this.emoji = this.isDarkTheme ? '&#x2600;' : '&#x1F319;';
  }  
}