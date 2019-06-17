import { TLabel, ILabeledText, TText, ITrainResult, State } from 'src/app/interfaces/interfaces';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable, from } from 'rxjs';
import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { saveAs } from 'file-saver';
import { TextClassifierService, configDefault } from '../../services/text-classifier.service';
import { ShowProgressSpinnerService } from '../../services/show-progress-spinner.service';
import { ScratchManagerService } from '../../services/scratch-manager.service';
import { InputLabeledTextManagerService } from '../../services/input-labeled-text-manager.service';

type DialogData = TLabel;

@Component({
  selector: 'app-ml-modelo',
  templateUrl: './ml-model.component.html',
  styleUrls: ['./ml-model.component.css']
})
export class MlModelComponent implements OnInit {

  panelOpenState = false;
  labels = new Set<TLabel>();
  trainResult: ITrainResult;
  @ViewChild('fileElement') fileElement: ElementRef;

  constructor(
    public inputLabeledTextManager: InputLabeledTextManagerService,
    private textClassifierService: TextClassifierService,
    private scratchManager: ScratchManagerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private progressSpinner: ShowProgressSpinnerService) {
  }

  ngOnInit() {

  }

  getState() {
    return this.textClassifierService.getState();
  }

  save() {
    const blob = new Blob([this.serializeModel()], { type: 'application/json' });
    saveAs(blob, this.inputLabeledTextManager.name);
  }

  load() {
    this.fileElement.nativeElement.click();
  }

  getConfig(){
    return this.textClassifierService.getConfiguration();
  }

  onLoaded(e) {
    let file = e.target.files[0];
    let inputDataName = file.name.replace(/\.[^/.]+$/, "");
    this.inputLabeledTextManager.name = inputDataName;
    let fileReader = new FileReader();

    fileReader.readAsText(file);

    console.log("empieza");

    let promise = new Promise((resolve, error) => {
      fileReader.onload = (e) => {
        console.log(fileReader.result);
        this.inputLabeledTextManager.load(fileReader.result.toString());
        // This creates a new model
        this.textClassifierService.clear();
        this.textClassifierService.setTraindata(this.inputLabeledTextManager.labelsWithTexts)
        resolve(true);
      }
    }).then(() => {
      return true;
    },
      () => {
        return false;
      });

    let loadObservable = from(promise);

    let d = this
      .progressSpinner
      .showProgressSpinnerUntilExecuted(loadObservable,
        "Cargando archivo", "assets/images/modern-times.gif",
        "Fichero cargado", "");

  }

  saveInputLabeledTexts() {
    this.inputLabeledTextManager.save();
  }

  train() {
    console.log(this.inputLabeledTextManager.labelsWithTexts);
    
    let trainObservable = this.textClassifierService.train();
    let d = this.progressSpinner
      .showProgressSpinnerUntilExecuted(trainObservable,
        "Entrenando el modelo", "assets/images/modern-times.gif",
        "Modelo entrenado", "Ya puedes usar el modelo");
  }

  addLabel() {
    const dialogRef = this.dialog.open(MlAddLabelDialogComponent, {
      width: '250px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(label => {
      console.log('The dialog was closed');
      if (label == "") return;
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

  serializeModel(): string {
    let dataObject = {};

    for (let label of this.inputLabeledTextManager.labelsWithTexts.keys()) {
      dataObject[label] = [];
      for (let text of this.inputLabeledTextManager.labelsWithTexts.get(label)) {
        dataObject[label].push(text);
      }
    }
    let dataJSON = JSON.stringify(dataObject);

    return dataJSON;
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
