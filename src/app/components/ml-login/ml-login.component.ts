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

  username: string;

  constructor(
    public authService: AuthenticationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar ) {
    this.username = authService.getCurrentUsername();
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
      if (user == null) return;
      let message = "";

      this.authService.login(user).subscribe(
        v => {
          this.username = v.username;
          message =  'Ahora puedes guardar tus proyectos y compartirlos con la comunidad';
          this.snackBar.open(message,
            'Bienvenido', {
            duration: 3000,
            verticalPosition: 'top'
          });
        },
        e => {
          message = "El nombre de usuario o la contraseña son incorrectos";
          this.snackBar.open(message,
            'Error', {
            duration: 3000,
            verticalPosition: 'top'
          });
        });
    });
  }

  openMyStuff(){
    let token = this.authService.getCurrentToken();
    window.location.href = 'http://localhost:8000/projects/home?token=' + token;
  }
  
  logout(){
    this.authService.logout();
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