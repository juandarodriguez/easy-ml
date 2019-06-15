import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

type DialogData = string;

@Component({
  selector: 'app-progress-spinner-dialog',
  templateUrl: './progress-spinner-dialog.component.html',
  styleUrls: ['./progress-spinner-dialog.component.css']
})
export class ProgressSpinnerDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProgressSpinnerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  continue(){

  }

}
