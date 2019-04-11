import { Component, OnInit, Inject } from '@angular/core';
import { TextClasifyerService } from 'src/app/services/text-clasifyer.service';
import { Data_Label, ITextModel, Data_Text, ITrainResult } from 'src/app/interfaces/interfaces';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { ShowProgressSpinnerService } from '../../services/show-progress-spinner.service';

type DialogData = Data_Label;

@Component({
  selector: 'app-ml-modelo',
  templateUrl: './ml-model.component.html',
  styleUrls: ['./ml-model.component.css']
})
export class MlModelComponent implements OnInit {

  entry: string;
  model: ITextModel
  labels = new Set<Data_Label>();
  texts = new Map<Data_Label, Set<Data_Text>>();
  trainResult: ITrainResult;


  constructor(
    private textClasifyerService: TextClasifyerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private progressSpinner: ShowProgressSpinnerService) {
      this.trainResult = this.textClasifyerService.trainResult;
  }

  ngOnInit() {
    this.model = this.textClasifyerService.getModel();
  }

  loadModel() {
    this.textClasifyerService.load("kuku").subscribe(model => {
      this.model = model;
      this.labels = new Set(model.labels.keys());
      this.texts = model.labels;
    });
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

}


@Component({
  templateUrl: 'ml-add-label-dialog.html',
})
export class MlAddLabelDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MlAddLabelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
