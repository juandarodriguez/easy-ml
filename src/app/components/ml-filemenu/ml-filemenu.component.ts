import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-ml-filemenu',
  templateUrl: './ml-filemenu.component.html',
  styleUrls: ['./ml-filemenu.component.css']
})
export class MlFilemenuComponent implements OnInit {

  constructor(public authService: AuthenticationService) {
  }

  ngOnInit() {
  }

}
