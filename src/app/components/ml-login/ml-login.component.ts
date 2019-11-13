import { Component, OnInit, Inject } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-ml-login',
  templateUrl: './ml-login.component.html',
  styleUrls: ['./ml-login.component.css']
})
export class MlLoginComponent implements OnInit {

  isAuthenticated: Boolean = false;
  constructor(
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar, ) {
    this.isAuthenticated = authService.isAuthenticated();
  }

  ngOnInit() {
  }

  showLoginForm() {
    const dialogRef = this.dialog.open(MlFormLoginDialogComponent, {
      width: '250px',
      data: { username: "", password: "" }
    });

    dialogRef.afterClosed().subscribe(user => {
      console.log('The dialog was closed');
      console.log(user);
      if (user == "") return;

      this.authService.login(user).subscribe(
        v => {
          console.log(v);
        },
        e => {
          console.log("error");
          console.log(e);
        });

      this.snackBar.open('Adeennnntro',
        '', {
        duration: 2000,
      });
    });
  }
}

@Component({
  templateUrl: 'ml-form-login-dialog.html',
})
export class MlFormLoginDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<MlFormLoginDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User) { }

  close(event) {
    console.log(event);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}