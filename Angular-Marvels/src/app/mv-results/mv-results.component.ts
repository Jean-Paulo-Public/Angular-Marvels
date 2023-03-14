/* mv-results.component.ts  */

import { Component, OnInit, Input } from '@angular/core';
import { MarvelService } from '../services/marvel.service';
import { Result } from '../models/marvel-character';

@Component({
  selector: 'app-mv-results',
  templateUrl: './mv-results.component.html',
  styleUrls: ['./mv-results.component.css']
})
export class MvResultsComponent implements OnInit {
  @Input() isDarkTheme = false;
  
  results: Result[] = [];

  constructor(private marvelService: MarvelService) {}

  getCharacterId(name: string): string {
    return 'list-' + name.toLowerCase().split(' ').join('-').replace(/[^\w-]/g, '') + '-list';
  }

  ngOnInit() {
    this.marvelService.getResults().subscribe(results => {
      this.results = results;
    });
  }
}

/*

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mv-results',
  templateUrl: './mv-results.component.html',
  styleUrls: ['./mv-results.component.css']
})
export class MvResultsComponent {
  @Input() isDarkTheme = false;

  results = [{ name: "Homem de ferro", description: "O Homem de Ferro é um super-herói dos quadrinhos da Marvel Comics. Ele foi criado por Stan Lee, Larry Lieber, Don Heck e Jack Kirby e sua primeira aparição foi em Tales of Suspense #39 em 1963." },
  { name: "Hulk", description: "Hulk é um personagem de quadrinhos do gênero super-herói, propriedade da Marvel Comics. Ele foi criado por Stan Lee e Jack Kirby e sua primeira aparição foi em The Incredible Hulk #1 em maio de 1962." },
  { name: "Thor", description: "Thor é um personagem de quadrinhos do gênero super-herói, propriedade da Marvel Comics. Ele foi criado por Jack Kirby, Stan Lee e Larry Lieber e sua primeira aparição foi em Journey into Mystery #83 em agosto de 1962." }
  ]
}

*/