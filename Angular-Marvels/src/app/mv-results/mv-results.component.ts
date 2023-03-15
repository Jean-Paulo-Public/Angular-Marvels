/* mv-results.component.ts */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MarvelService } from '../services/marvel.service';

@Component({
    selector: 'app-mv-results',
    templateUrl: './mv-results.component.html',
    styleUrls: ['./mv-results.component.css']
})
export class MvResultsComponent implements OnInit {
    @Input() isDarkTheme = false;
    @Input() selectedType: string = 'characters';

    results: any[] = [];

    getCharacterId(name: string): string {
      return 'list-' + name.toLowerCase().split(' ').join('-').replace(/[^\w-]/g, '') + '-list';
    }    

    constructor(private marvelService: MarvelService) {}

    ngOnInit() {
        this.updateResults();
    }

    ngOnChanges() {
        this.updateResults();
    }

    // adiciona um método para atualizar os resultados
    updateResults() {
        if (this.selectedType) {
            this.marvelService.getResults(this.selectedType).subscribe(results => {
                this.results = results;
            });
        }
    }
}