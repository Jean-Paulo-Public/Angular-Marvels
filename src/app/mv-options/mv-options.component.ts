/* mv-options.component.ts  */

import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-mv-options',
  templateUrl: './mv-options.component.html',
  styleUrls: ['./mv-options.component.css']
})
export class MvOptionsComponent {
  @Input() isDarkTheme = false;
  
  @Output() optionSelected = new EventEmitter<number>();

  options = [5, 10, 20, 50, 100];
  
  resultsPerPage: number = this.options[0];

  toggleOption() {
    this.optionSelected.emit(this.resultsPerPage);
  }
}