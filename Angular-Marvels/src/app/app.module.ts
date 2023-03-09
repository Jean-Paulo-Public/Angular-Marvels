/* app.module.ts  */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';

import { MatIconModule } from '@angular/material/icon';

import { MatInputModule } from '@angular/material/input';
import { MvToolbarComponent } from './mv-toolbar/mv-toolbar.component';

import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { MvButtonToggleGroupComponent } from './mv-button-toggle-group/mv-button-toggle-group.component';

@NgModule({
  declarations: [
    AppComponent,
    MvToolbarComponent,
    MvButtonToggleGroupComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatButtonToggleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
