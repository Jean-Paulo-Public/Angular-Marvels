/* mv-button-toggle-group.component.ts  */

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mv-button-toggle-group',
  templateUrl: './mv-button-toggle-group.component.html',
  styleUrls: ['./mv-button-toggle-group.component.css']
})
export class MvButtonToggleGroupComponent {  
  buttonsOfMvButtonToggle = [
    {value: 'favorites', text: 'Favoritos'},
    {value: 'characters', text: 'Personagens'},
    {value: 'stories', text: 'Histórias'},
    {value: 'events', text: 'Eventos'},
    {value: 'series', text: 'Séries'},
    {value: 'comics', text: 'Comics'},
    {value: 'creators', text: 'Criadores'},
    {value: 'likeds', text: 'Curtidos'}
  ];  

  @Output() selectionChange = new EventEmitter<string>();


  toggleMvButtonToggle(typeSelected: string) {
    this.selectionChange.emit(typeSelected)
  }

}
