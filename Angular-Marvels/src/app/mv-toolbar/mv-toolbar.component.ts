/*mv-toolbar.component.ts*/

import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-mv-toolbar',
  templateUrl: './mv-toolbar.component.html',
  styleUrls: ['./mv-toolbar.component.css']
})
export class MvToolbarComponent {
  @Input() pageTitle = 'Angular Marvels';
  @Input() isDarkTheme = false;
  @Output() themeChanged = new EventEmitter<boolean>();

  emoji = '&#x1F319;'; // começa com o emoji da lua
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    // alterna o emoji de acordo com o tema
    this.emoji = this.isDarkTheme ? '&#x2600;' : '&#x1F319;';
    this.themeChanged.emit(this.isDarkTheme)
  }
}
