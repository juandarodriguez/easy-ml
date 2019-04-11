import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FileSelectDirective } from 'ng2-file-upload';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatGridListModule} from '@angular/material/grid-list'; 
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatExpansionModule} from '@angular/material/expansion'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {MatListModule} from '@angular/material/list'; 
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatTooltipModule} from '@angular/material/tooltip'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatChipsModule} from '@angular/material/chips'; 
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'; 

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MlModelComponent, MlAddLabelDialogComponent } from './components/ml-model/ml-model.component';
import { MlConfigurationComponent } from './components/ml-configuration/ml-configuration.component';
import { MlTestModelComponent } from './components/ml-test-model/ml-test-model.component';
import { MlLabelContainerComponent, MlLabelContainerDialogComponent, MlDeleteConfirmComponent } from './components/ml-label-container/ml-label-container.component';
import { MlModelToolbarComponent } from './components/ml-model-toolbar/ml-model-toolbar.component';
import { ProgressSpinnerDialogComponent } from './components/progress-spinner-dialog/progress-spinner-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    FileSelectDirective,
    PageNotFoundComponent,
    MlModelComponent,
    MlConfigurationComponent,
    MlTestModelComponent,
    MlLabelContainerComponent,
    MlLabelContainerDialogComponent,
    MlDeleteConfirmComponent,
    MlAddLabelDialogComponent,
    MlModelToolbarComponent,
    ProgressSpinnerDialogComponent
  ],
  entryComponents: [
    MlLabelContainerComponent,
    MlLabelContainerDialogComponent,
    MlDeleteConfirmComponent,
    MlAddLabelDialogComponent,
    ProgressSpinnerDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatInputModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
    MatIconModule,
    MatChipsModule,
    MatProgressBarModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
