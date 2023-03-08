/*app.component.ts*/
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isDarkTheme = false;
  pageTitle = 'Angular Marvels'
  onThemeChanged(theme: boolean) {
    this.isDarkTheme = theme; // muda a variável de acordo com o evento recebido 
  }
}