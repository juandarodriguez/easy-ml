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
  @Input('texts') texts: Set<TText>;
  @Input('label') label: TLabel;
  @Output() onChildDeleted = new EventEmitter<TLabel>();

  constructor(
    private inputLabeledTextManager: InputLabeledTextManagerService,
    private textClassifierService: TextClassifierService,
    private scratchManager: ScratchManagerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
      this.texts = new Set<TText>();
  }

  ngOnInit() { 
    console.log(this.label);
  }

  addTerm() {
    const dialogRef = this.dialog.open(MlLabelContainerDialogComponent, {
      width: '250px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(result == "") return;
      // This is the first text to be added in the label set
      this.texts.add(result);
      let entry = {label: this.label, text: result};
      this.inputLabeledTextManager.addEntry(entry);
      this.textClassifierService.addEntry(entry);
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
      let entry = {label: this.label , text:result};
      this.inputLabeledTextManager.removeEntry(entry);
      this.textClassifierService.removeEntry(entry);
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



