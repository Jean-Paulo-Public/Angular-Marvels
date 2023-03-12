import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mv-results',
  templateUrl: './mv-results.component.html',
  styleUrls: ['./mv-results.component.css']
})
export class MvResultsComponent {
  @Input() isDarkTheme = false;
}
