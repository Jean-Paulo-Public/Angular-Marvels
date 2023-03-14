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

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeChanged.emit(this.isDarkTheme)
  }
}
