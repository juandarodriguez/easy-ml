import { TLabel, ILabeledText, TText, ITrainResult, State } from 'src/app/interfaces/interfaces';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';

import { TextClassifierService } from '../../services/text-classifier.service';
import { ShowProgressSpinnerService } from '../../services/show-progress-spinner.service';
import { ScratchManagerService } from '../../services/scratch-manager.service';
import { CrossDomainStorageService } from '../../services/cross-domain-storage.service';
import { InputLabeledTextManagerService } from '../../services/input-labeled-text-manager.service';

type DialogData = TLabel;

@Component({
  selector: 'app-ml-modelo',
  templateUrl: './ml-model.component.html',
  styleUrls: ['./ml-model.component.css']
})
export class MlModelComponent implements OnInit {

  panelOpenState = false;
  traindata: Set<ILabeledText>;
  labels = new Set<TLabel>();
  labelsWithTexts = new Map<TLabel, Set<Text>>();
  trainResult: ITrainResult;
  @ViewChild('fileElement') fileElement: ElementRef;

  constructor(
    public inputLabeledTextManager: InputLabeledTextManagerService,
    private textClassifierService: TextClassifierService,
    private scratchManager: ScratchManagerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private progressSpinner: ShowProgressSpinnerService,
    private cdls: CrossDomainStorageService) {
  }

  ngOnInit() {
    
  }

  getState(){
    return this.textClassifierService.state;
  }

  loadModel() {
    this.fileElement.nativeElement.click();
  }

  onLoaded(e) {
    let file = e.target.files[0];
    let inputDataName = file.name.replace(/\.[^/.]+$/, "");
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      console.log(fileReader.result);
      this.inputLabeledTextManager.load(fileReader.result.toString());
    }

    fileReader.readAsText(file);
  }

  saveInputLabeledTexts() {
    this.inputLabeledTextManager.save();
  }

  train() {
    console.log(this.inputLabeledTextManager.labelsWithTexts);
    //this.textClassifierService.setTraindata(this.traindata)
    //let trainObservable = this.textClassifierService.train();
    //let d = this.progressSpinner.showProgressSpinnerUntilExecuted(trainObservable);
  }

  addLabel() {
    const dialogRef = this.dialog.open(MlAddLabelDialogComponent, {
      width: '250px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(label => {
      console.log('The dialog was closed');
      if(label == "") return;
      this.inputLabeledTextManager.addLabel(label);
      this.snackBar.open('Añadida la etiqueta',
        '', {
          duration: 2000,
        });
    });
  }

  onDeleted($event) {
    this.labels.delete($event);
    this.inputLabeledTextManager.removeLabel($event);
  }

  loadScratch() {
    this.scratchManager.load();
  }

}


@Component({
  templateUrl: 'ml-add-label-dialog.html',
})
export class MlAddLabelDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MlAddLabelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  close(event) {
    console.log(event);
  }
  
  onNoClick(): void {
    this.dialogRef.close();
  }
}
