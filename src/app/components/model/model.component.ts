import { Component, OnInit } from '@angular/core';
import { TextClasifyerService } from 'src/app/services/text-clasifyer.service';

@Component({
  selector: 'app-modelo',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  constructor(private textClasifyerService: TextClasifyerService) { 
  }

  ngOnInit() {
  }

}
