import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TextClassifierService } from '../../services/text-classifier.service';
import { ILabeledText } from '../../interfaces/interfaces';
import { InputLabeledTextManagerService } from '../../services/input-labeled-text-manager.service';

@Component({
  selector: 'app-ml-model-toolbar',
  templateUrl: './ml-model-toolbar.component.html',
  styleUrls: ['./ml-model-toolbar.component.css']
})
export class MlModelToolbarComponent implements OnInit {

  name: string;
  labeledText: ILabeledText;
  @ViewChild("inputNameModel") inputNameModel: ElementRef;

  constructor(
    public inputLabeledTextManager: InputLabeledTextManagerService,
    private textClassifierService: TextClassifierService) {
  }

  ngOnInit() {
        
  }

  getState(){
    return this.textClassifierService.getState();
  }

  updateModelName(event){
    console.log(event);
    if(event.key=="Enter" || event.type=="blur"){
    
    }
  }
}
