import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { TextClasifyerService } from 'src/app/services/text-clasifyer.service';
import { Data_Label, ITextModel, Data_Text, ITrainResult, State } from 'src/app/interfaces/interfaces';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { ShowProgressSpinnerService } from '../../services/show-progress-spinner.service';
import { ScratchManagerService } from '../../services/scratch-manager.service';
import { CrossDomainStorageService } from '../../services/cross-domain-storage.service';

type DialogData = Data_Label;

@Component({
  selector: 'app-ml-modelo',
  templateUrl: './ml-model.component.html',
  styleUrls: ['./ml-model.component.css']
})
export class MlModelComponent implements OnInit {

  panelOpenState = false;
  entry: string;
  model: ITextModel
  labels = new Set<Data_Label>();
  texts = new Map<Data_Label, Set<Data_Text>>();
  trainResult: ITrainResult;
  @ViewChild('fileElement') fileElement: ElementRef;

  constructor(
    private textClasifyerService: TextClasifyerService,
    private scratchManager: ScratchManagerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private progressSpinner: ShowProgressSpinnerService,
    private cdls: CrossDomainStorageService) {
    this.trainResult = this.textClasifyerService.trainResult;
  }

  ngOnInit() {
    this.model = this.textClasifyerService.model;
  }


  loadModel() {
    this.textClasifyerService.resetModel()
    this.fileElement.nativeElement.click();
  }

  onLoaded(e) {
    let file = e.target.files[0];
    let modelName = file.name.replace(/\.[^/.]+$/, "");
    this.model.name = modelName;
    let fileReader = new FileReader();

    fileReader.onload = (e) => {
      //console.log(fileReader.result);
      this.textClasifyerService.load(fileReader.result.toString(), modelName).subscribe(model => {
        
        this.model = model;
        this.model.name = modelName;
        this.labels = new Set(model.labels.keys());
        this.texts = model.labels;
      });
    }

    fileReader.readAsText(file);

  }

  saveModel() {
    this.textClasifyerService.save();
  }

  trainModel() {
    let trainObservable = this.textClasifyerService.train();
    let d = this.progressSpinner.showProgressSpinnerUntilExecuted(trainObservable);
  }

  run() {
    console.log(this.textClasifyerService.run(this.entry));
  }

  addLabel() {
    const dialogRef = this.dialog.open(MlAddLabelDialogComponent, {
      width: '250px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.textClasifyerService.addLabel(result);
      this.labels.add(result);
      this.snackBar.open('Añadida la etiqueta',
        '', {
          duration: 2000,
        });
    });
  }

  onDeleted($event) {
    this.labels.delete($event);
    this.textClasifyerService.removeLabel($event);
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
