import { Component, OnInit } from '@angular/core';
import { ITextModel } from 'src/app/interfaces/interfaces';
import { TextClasifyerService } from 'src/app/services/text-clasifyer.service';

@Component({
  selector: 'app-ml-configuration',
  templateUrl: './ml-configuration.component.html',
  styleUrls: ['./ml-configuration.component.css']
})
export class MlConfigurationComponent implements OnInit {

  constructor(private textClasifyerService: TextClasifyerService) { }

  ngOnInit() {
  }

  update(){
    this.textClasifyerService.train();
  }

}
