/* mv-results.component.ts */
import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let MvResultsComponent = class MvResultsComponent {
    constructor(marvelService) {
        this.marvelService = marvelService;
        this.isDarkTheme = false;
        this.selectedType = 'characters';
        this.resultsPerPage = 5;
        this.totalResults = 0;
        this.results = [];
    }
    getCharacterId(name) {
        return 'list-' + name.toLowerCase().split(' ').join('-').replace(/[^\w-]/g, '') + '-list';
    }
    ngOnInit() {
        this.updateResults();
    }
    ngOnChanges() {
        this.updateResults();
    }
    // adiciona um parâmetro adicional ao método updateResults()
    updateResults(pageIndex) {
        if (!pageIndex) {
            pageIndex = 0;
        }
        if (this.selectedType) {
            this.marvelService.getResults(this.selectedType, this.resultsPerPage, pageIndex).subscribe(({ results, totalResults }) => {
                this.results = results;
                // atualiza o valor da propriedade total results com base no valor retornado pelo serviço
                this.totalResults = totalResults;
            });
        }
    }
    // adiciona um método para lidar com mudanças de página
    onPageChange(event) {
        const pageIndex = event.pageIndex;
        // atualiza os resultados com base na página selecionada
        this.updateResults(pageIndex);
    }
};
__decorate([
    Input()
], MvResultsComponent.prototype, "isDarkTheme", void 0);
__decorate([
    Input()
], MvResultsComponent.prototype, "selectedType", void 0);
__decorate([
    Input()
], MvResultsComponent.prototype, "resultsPerPage", void 0);
MvResultsComponent = __decorate([
    Component({
        selector: 'app-mv-results',
        templateUrl: './mv-results.component.html',
        styleUrls: ['./mv-results.component.css']
    })
], MvResultsComponent);
export { MvResultsComponent };
//# sourceMappingURL=mv-results.component.js.map