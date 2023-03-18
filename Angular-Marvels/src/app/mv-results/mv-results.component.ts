/* mv-results.component.ts */

import { Component, OnInit, Input } from '@angular/core';
import { MarvelService } from '../services/marvel.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-mv-results',
    templateUrl: './mv-results.component.html',
    styleUrls: ['./mv-results.component.css']
})
export class MvResultsComponent implements OnInit {
    @Input() isDarkTheme = false;

    @Input() selectedType: string = 'characters';

    @Input() resultsPerPage: number = 5;

    totalResults: number = 0;

    results: any[] = [];

    getCharacterId(name: string): string {
        return 'list-' + name.toLowerCase().split(' ').join('-').replace(/[^\w-]/g, '') + '-list';
    }

    constructor(private marvelService: MarvelService) { }

    ngOnInit() {
        this.updateResults();
    }

    ngOnChanges() {
        this.updateResults();
    }

    // adiciona um parâmetro adicional ao método updateResults()
    updateResults(pageIndex?: number) {
        if (!pageIndex){
            pageIndex = 0;
        }

        if (this.selectedType) {
            this.marvelService.getResults(this.selectedType, this.resultsPerPage, pageIndex).subscribe( ({results, totalResults}) => {
                this.results = results;
                // atualiza o valor da propriedade total results com base no valor retornado pelo serviço
                this.totalResults = totalResults;
            });
        }
    }
    // adiciona um método para lidar com mudanças de página
    onPageChange(event: PageEvent) {
        const pageIndex = event.pageIndex;
        // atualiza os resultados com base na página selecionada
        this.updateResults(pageIndex);
    }
}