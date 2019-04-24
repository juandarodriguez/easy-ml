import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog, MatSnackBar } from '@angular/material';
import { ProgressSpinnerDialogComponent } from '../components/progress-spinner-dialog/progress-spinner-dialog.component';
import { Observable } from 'rxjs';
import { TextClasifyerService } from './text-clasifyer.service';

@Injectable({
  providedIn: 'root'
})
export class ShowProgressSpinnerService {

  response: string;

  constructor(
    private textClasifiyerService: TextClasifyerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  showProgressSpinnerUntilExecuted(observable: Observable<Object>) {

    let dialogRef: MatDialogRef<ProgressSpinnerDialogComponent>
      = this.dialog.open(ProgressSpinnerDialogComponent, {
        panelClass: 'transparent',
        disableClose: true,
      });

    let subscription = observable.subscribe(
      (response: any) => {
        subscription.unsubscribe();

        //handle response
        this.textClasifiyerService.trainResult = {
          error: response.error,
          iterations: response.iterations
        }


        this.snackBar.open('¡Modelo entrenado!',
          'Ya pueedes usar tu nuevo modelo', {
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
