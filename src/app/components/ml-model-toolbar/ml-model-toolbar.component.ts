import { Component, OnInit, EventEmitter } from '@angular/core';
import { TextClasifyerService } from 'src/app/services/text-clasifyer.service';

@Component({
  selector: 'app-ml-model-toolbar',
  templateUrl: './ml-model-toolbar.component.html',
  styleUrls: ['./ml-model-toolbar.component.css']
})
export class MlModelToolbarComponent implements OnInit {

  constructor(private textClasifyerService: TextClasifyerService) {

  }

  ngOnInit() {
  }

}
