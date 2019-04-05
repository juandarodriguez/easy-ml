import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatFormFieldModule} from '@angular/material/form-field';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ModelComponent } from './components/model/model.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    ModelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
