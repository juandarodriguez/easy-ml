import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TLabel, TText,ILabeledText } from 'src/app/interfaces/interfaces';
import { TextClassifierService } from '../../services/text-classifier.service';
import { ScratchManagerService } from '../../services/scratch-manager.service';
import { InputLabeledTextManagerService } from '../../services/input-labeled-text-manager.service';

export type DialogData = string;

@Component({
  selector: 'app-ml-label-container',
  templateUrl: './ml-label-container.component.html',
  styleUrls: ['./ml-label-container.component.css']
})
export class MlLabelContainerComponent implements OnInit {

  panelOpenState = true;
  @Input('label') label: TLabel;
  @Input('texts') texts:  Set<TText>;
  @Output() onChildDeleted = new EventEmitter<TLabel>();

  constructor(
    private inputLabeledTextManager: InputLabeledTextManagerService,
    private scratchManager: ScratchManagerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() { 
    console.log(this.label);
    console.log(this.texts);
  }

  addTerm() {
    const dialogRef = this.dialog.open(MlLabelContainerDialogComponent, {
      width: '250px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // This is the first text to be added in the label set
      if(this.texts == undefined){
        this.texts = new Set<TText>();
      }
      this.texts.add(result);
      this.inputLabeledTextManager.addEntry({label: this.label, text: result});
      this.scratchManager.modelUpdated = false;
      this.snackBar.open('Añadido texto',
        '', {
          duration: 2000,
        });
    });
  }

  delete(text: string) {
    const dialogRef = this.dialog.open(MlDeleteConfirmComponent, {
      width: '250px',
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.texts.delete(result);
      this.inputLabeledTextManager.removeEntry({label: this.label , text:result})
      this.scratchManager.modelUpdated = false;
      this.snackBar.open('Eliminado texto',
        '', {
          duration: 2000,
        });
    });
  }

  deleteLabel() {
    const dialogRef = this.dialog.open(MlDeleteConfirmComponent, {
      width: '250px',
      data: this.label
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.inputLabeledTextManager.removeLabel(result);
      this.onChildDeleted.emit(result);

      this.snackBar.open('Eliminada la etiqueta ' + result,
        this.label, {
          duration: 2000,
        });
    });
  }


}

@Component({
  templateUrl: 'ml-label-container-dialog.html',
})
export class MlLabelContainerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MlLabelContainerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  templateUrl: 'ml-confirm-dialog.html',
})
export class MlDeleteConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<MlDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}



