/* app.module.ts  */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatInputModule } from '@angular/material/input';
import { MvToolbarComponent } from './mv-toolbar/mv-toolbar.component';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MvButtonToggleGroupComponent } from './mv-button-toggle-group/mv-button-toggle-group.component';

/*import { FormsModule } from '@angular/forms';*/

/*import { JoinPipe } from './join.pipe';*/

import { MatCardModule } from '@angular/material/card';
import { MvFooterCardComponent } from './mv-footer-card/mv-footer-card.component';
import { MvSectionComponent } from './mv-section/mv-section.component';
import { MvOptionsComponent } from './mv-options/mv-options.component';
import { MvResultsComponent } from './mv-results/mv-results.component';

@NgModule({
  declarations: [
    AppComponent,
    MvToolbarComponent,
    MvButtonToggleGroupComponent,
    MvFooterCardComponent,
    MvSectionComponent,
    MvOptionsComponent,
    MvResultsComponent
    /*JoinPipe*/
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonToggleModule,
    /*FormsModule,*/
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
