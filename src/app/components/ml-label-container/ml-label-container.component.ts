import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-ml-label-container',
  templateUrl: './ml-label-container.component.html',
  styleUrls: ['./ml-label-container.component.css']
})
export class MlLabelContainerComponent implements OnInit {

  panelOpenState = true;
  texts: string[];

  name: string;
  animal: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.texts = [
      // encender_lampara
      "que me tocan el culo",
      "enciende la luz",
      "esto está muy oscuro",
      "qué oscuridad",
      "dale a la luz",
      "enciende la lámpara",
      "se está poniendo el sol",
      "no veo nada",
      "necesito luz",
      "no hay suficiente luz",

      // apagar_lampara
      "apaga la luz",
      "apaga la lámpara",
      "hay demasiada luz",
      "menos luz",
      "desconecta la luz",
      "quiero estar en la oscuridad",
      "está demasiado claro",
      "mucha claridad",
      "me gusta la oscuridad",
      "prefiero la oscuridad"

    ]
  }

  addTerm() {
    const dialogRef = this.dialog.open(MlLabelContainerDialogComponent, {
      width: '250px',
      data: { name: this.name, animal: this.animal }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
      alert(result);
    });
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class MlLabelContainerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MlLabelContainerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

