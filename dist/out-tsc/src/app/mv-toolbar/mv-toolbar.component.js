/*mv-toolbar.component.ts*/
import { __decorate } from "tslib";
import { Component, Input, Output, EventEmitter } from '@angular/core';
let MvToolbarComponent = class MvToolbarComponent {
    constructor() {
        this.pageTitle = 'Angular Marvels';
        this.isDarkTheme = false;
        this.themeChanged = new EventEmitter();
    }
    toggleTheme() {
        this.isDarkTheme = !this.isDarkTheme;
        this.themeChanged.emit(this.isDarkTheme);
    }
};
__decorate([
    Input()
], MvToolbarComponent.prototype, "pageTitle", void 0);
__decorate([
    Input()
], MvToolbarComponent.prototype, "isDarkTheme", void 0);
__decorate([
    Output()
], MvToolbarComponent.prototype, "themeChanged", void 0);
MvToolbarComponent = __decorate([
    Component({
        selector: 'app-mv-toolbar',
        templateUrl: './mv-toolbar.component.html',
        styleUrls: ['./mv-toolbar.component.css']
    })
], MvToolbarComponent);
export { MvToolbarComponent };
//# sourceMappingURL=mv-toolbar.component.js.map