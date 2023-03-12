/* mv-button-toggle-group.component.ts  */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mv-button-toggle-group',
  templateUrl: './mv-button-toggle-group.component.html',
  styleUrls: ['./mv-button-toggle-group.component.css']
})
export class MvButtonToggleGroupComponent {
  buttonsOfMvButtonToggle = [
    {value: 'favoritos', text: 'Favoritos'},
    {value: 'personagens', text: 'Personagens'},
    {value: 'historia', text: 'Histórias'},
    {value: 'eventos', text: 'Eventos'},
    {value: 'series', text: 'Séries'},
    {value: 'comics', text: 'Comics'},
    {value: 'criadores', text: 'Criadores'},
    {value: 'curtidos', text: 'Curtidos'}
  ];  
}
