import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
let MvSectionComponent = class MvSectionComponent {
    constructor() {
        this.isDarkTheme = false;
        this.selectedType = 'favorites';
        this.resultsPerPage = 5;
    }
};
__decorate([
    Input()
], MvSectionComponent.prototype, "isDarkTheme", void 0);
__decorate([
    Input()
], MvSectionComponent.prototype, "selectedType", void 0);
MvSectionComponent = __decorate([
    Component({
        selector: 'app-mv-section',
        templateUrl: './mv-section.component.html',
        styleUrls: ['./mv-section.component.css']
    })
], MvSectionComponent);
export { MvSectionComponent };
//# sourceMappingURL=mv-section.component.js.map