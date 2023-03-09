import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mv-button-toggle-group',
  templateUrl: './mv-button-toggle-group.component.html',
  styleUrls: ['./mv-button-toggle-group.component.css']
})
export class MvButtonToggleGroupComponent {
  @Input() buttons?: any[]; // recebendo o input de buttons
}
