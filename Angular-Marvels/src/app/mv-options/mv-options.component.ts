import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mv-options',
  templateUrl: './mv-options.component.html',
  styleUrls: ['./mv-options.component.css']
})
export class MvOptionsComponent {
  @Input() isDarkTheme = false;
}
