import { Component, OnInit, Inject } from '@angular/core';
import { TextClasifyerService } from 'src/app/services/text-clasifyer.service';
import { ITextData, Data_Label } from 'src/app/interfaces/interfaces';
import { BagOfWordsService } from 'src/app/services/bag-of-words.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import * as brain from 'brain.js';

type DialogData = Data_Label;

@Component({
  selector: 'app-modelo',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  entry: string;
  labels: Set<Data_Label> = new Set();

  constructor(
    private textClasifyerService: TextClasifyerService,
    private dialog: MatDialog, private snackBar: MatSnackBar,
    private bow: BagOfWordsService) {
  }

  ngOnInit() { }

  dale() {
    const data = new Set<ITextData>(
      [
        { text: "que me tocan el culo ", label: "encender_lampara" },
        { text: "enciende la luz", label: "encender_lampara" },
        { text: "esto está muy oscuro", label: "encender_lampara" },
        { text: "qué oscuridad", label: "encender_lampara" },
        { text: "dale a la luz", label: "encender_lampara" },
        { text: "enciende la lámpara", label: "encender_lampara" },
        { text: "se está poniendo el sol", label: "encender_lampara" },
        { text: "no veo nada", label: "encender_lampara" },
        { text: "necesito luz", label: "encender_lampara" },
        { text: "no hay suficiente luz", label: "encender_lampara" },

        { text: "apaga la luz", label: "apagar_lampara" },
        { text: "apaga la lámpara", label: "apagar_lampara" },
        { text: "hay demasiada luz", label: "apagar_lampara" },
        { text: "menos luz", label: "apagar_lampara" },
        { text: "desconecta la luz", label: "apagar_lampara" },
        { text: "quiero estar en la oscuridad", label: "apagar_lampara" },
        { text: "está demasiado claro", label: "apagar_lampara" },
        { text: "mucha claridad", label: "apagar_lampara" },
        { text: "me gusta la oscuridad", label: "apagar_lampara" },
        { text: "prefiero la oscuridad", label: "apagar_lampara" },
        { text: "veo muy bien", label: "apagar_lampara" },
        
        { text: "qué sofocón", label: "encender_ventilador" },
        { text: "enciende el ventilador", label: "encender_ventilador" },
        { text: "hace mucho calor", label: "encender_ventilador" },
        { text: "demasiado calor", label: "encender_ventilador" },
        { text: "pon en marcha el ventilador", label: "encender_ventilador" },
        { text: "qué calor", label: "encender_ventilador" },
        { text: "conecta el ventilador", label: "encender_ventilador" },
        { text: "me afixio", label: "encender_ventilador" },
        { text: "me derrito", label: "encender_ventilador" },
        { text: "dale caña al ventilador", label: "encender_ventilador" },
        { text: "que bochorno", label: "encender_ventilador" },
        { text: "me abraso", label: "encender_ventilador" },
        { text: "que calor tan sofocante", label: "encender_ventilador" },
        
        { text: "estoy arrecío", label: "apagar_ventilador" },
        { text: "qué frío", label: "apagar_ventilador" },
        { text: "apaga el ventilador", label: "apagar_ventilador" },
        { text: "hace mucho viento", label: "apagar_ventilador" },
        { text: "hace mucho frío", label: "apagar_ventilador" },
        { text: "demasiado frío", label: "apagar_ventilador" },
        { text: "quita el ventilador", label: "apagar_ventilador" },
        { text: "me congelo", label: "apagar_ventilador" },
        { text: "me voy a resfriar", label: "apagar_ventilador" },
        { text: "hay mucha corriente", label: "apagar_ventilador" },
        { text: "tengo la carne de gallina", label: "apagar_ventilador" },
        { text: "me estoy quedando pajarito", label: "apagar_ventilador" },


      ]);

    this.textClasifyerService.addEntries(data);

    this.textClasifyerService.train();

    console.log(this.textClasifyerService.run("enciende la luz"));
  }

  run() {
    console.log(this.textClasifyerService.run(this.entry));
  }

  addLabel(){
    const dialogRef = this.dialog.open(MlAddLabelDialogComponent, {
      width: '250px',
      data: ""
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.labels.add(result);
      this.snackBar.open('Añadida la etiqueta',
      '', {
        duration: 2000,
      });
    });
  }

  deleteLabel(text: string) {
    const dialogRef = this.dialog.open(MlDeleteConfirmComponent, {
      width: '250px',
      data: text
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.labels.delete(result);
      this.snackBar.open('Eliminado texto',
      '', {
        duration: 2000,
      });
      
    });
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

@Component({
  templateUrl: 'ml-delete-confirm-dialog.html',
})
export class MlDeleteConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<MlDeleteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
