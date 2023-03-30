/* mv-options.component.ts  */
import { __decorate } from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let MvOptionsComponent = class MvOptionsComponent {
    constructor() {
        this.isDarkTheme = false;
        this.optionSelected = new EventEmitter();
        this.options = [5, 10, 20, 50, 100];
        this.resultsPerPage = this.options[0];
    }
    toggleOption() {
        this.optionSelected.emit(this.resultsPerPage);
        console.log(this.resultsPerPage);
    }
};
__decorate([
    Input()
], MvOptionsComponent.prototype, "isDarkTheme", void 0);
__decorate([
    Output()
], MvOptionsComponent.prototype, "optionSelected", void 0);
MvOptionsComponent = __decorate([
    Component({
        selector: 'app-mv-options',
        templateUrl: './mv-options.component.html',
        styleUrls: ['./mv-options.component.css']
    })
], MvOptionsComponent);
export { MvOptionsComponent };
//# sourceMappingURL=mv-options.component.js.map