import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ProgressSpinnerDialogComponent } from '../components/progress-spinner-dialog/progress-spinner-dialog.component';
import { Observable } from 'rxjs';
import { TextClassifierService } from './text-classifier.service';

@Injectable({
  providedIn: 'root'
})
export class ShowProgressSpinnerService {

  response: string;

  constructor(
    private textClasifiyerService: TextClassifierService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  showProgressSpinnerUntilExecuted(observable: Observable<Object>,
    text: string, image: string,
    afterMessageTitle: string, afterMessage) {

    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent>
      = this.dialog.open(ProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true,
        data: {
          text: text,
          image: image
        }
      });

    let subscription = observable.subscribe(
      (response: any) => {
        subscription.unsubscribe();

        //handle response
        this.textClasifiyerService.trainResult = {
          error: response.error,
          iterations: response.iterations
        }


        this.snackBar.open(afterMessageTitle,
          afterMessage, {
            duration: 2000,
          });
        dialogRef.close();
      },
      (error) => {
        subscription.unsubscribe();
        //handle error
        dialogRef.close();
      }
    );

    return dialogRef;
  }
}
