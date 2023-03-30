import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mv-section',
  templateUrl: './mv-section.component.html',
  styleUrls: ['./mv-section.component.css']
})
export class MvSectionComponent {
  @Input() isDarkTheme = false;
  @Input() selectedType: string = 'favorites';
  @Input() searchText: string = '';
  resultsPerPage: number = 5;
}
