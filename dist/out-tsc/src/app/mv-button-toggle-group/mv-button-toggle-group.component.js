/* mv-button-toggle-group.component.ts  */
import { __decorate } from "tslib";
import { Component, Output, EventEmitter } from '@angular/core';
let MvButtonToggleGroupComponent = class MvButtonToggleGroupComponent {
    constructor() {
        this.buttonsOfMvButtonToggle = [
            { value: 'favorites', text: 'Favoritos' },
            { value: 'characters', text: 'Personagens' },
            { value: 'stories', text: 'Histórias' },
            { value: 'events', text: 'Eventos' },
            { value: 'series', text: 'Séries' },
            { value: 'comics', text: 'Comics' },
            { value: 'creators', text: 'Criadores' },
            { value: 'likeds', text: 'Curtidos' }
        ];
        this.selectionChange = new EventEmitter();
    }
    toggleMvButtonToggle(typeSelected) {
        this.selectionChange.emit(typeSelected);
    }
};
__decorate([
    Output()
], MvButtonToggleGroupComponent.prototype, "selectionChange", void 0);
MvButtonToggleGroupComponent = __decorate([
    Component({
        selector: 'app-mv-button-toggle-group',
        templateUrl: './mv-button-toggle-group.component.html',
        styleUrls: ['./mv-button-toggle-group.component.css']
    })
], MvButtonToggleGroupComponent);
export { MvButtonToggleGroupComponent };
//# sourceMappingURL=mv-button-toggle-group.component.js.map