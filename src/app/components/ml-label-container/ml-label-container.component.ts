import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Data_Label, Data_Text } from 'src/app/interfaces/interfaces';
import { TextClasifyerService } from 'src/app/services/text-clasifyer.service';

export type DialogData = string;

@Component({
  selector: 'app-ml-label-container',
  templateUrl: './ml-label-container.component.html',
  styleUrls: ['./ml-label-container.component.css']
})
export class MlLabelContainerComponent implements OnInit {

  panelOpenState = true;
  texts: Set<Data_Text> = new Set();
  @Input('label') label: Data_Label;
  @Input('texts') _texts: Data_Text[]
  @Output() onChildDeleted = new EventEmitter<Data_Label>();

  constructor(
    private textClasifyerService: TextClasifyerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) {
  }

  ngOnInit() { }

  addTerm() {
    const dialogRef = this.dialog.open(MlLabelContainerDialogComponent, {
      width: '250px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.texts.add(result);
      this.textClasifyerService.addEntry(result, this.label)
      this.snackBar.open('Añadido texto',
        '', {
          duration: 2000,
        });

      console.log(this.textClasifyerService.getModel());
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
      this.textClasifyerService.removeEntry(result)
      this.snackBar.open('Eliminado texto',
        '', {
          duration: 2000,
        });

      console.log(this.textClasifyerService.getModel());

    });
  }

  deleteLabel() {
    const dialogRef = this.dialog.open(MlDeleteConfirmComponent, {
      width: '250px',
      data: this.label
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.onChildDeleted.emit(result);

      this.snackBar.open('Eliminada la etiqueta',
        this.label, {
          duration: 2000,
        });

      console.log(this.textClasifyerService.getModel());
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



