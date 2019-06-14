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
  edit = false;
  @ViewChild("inputNameModel") inputNameModel: ElementRef;

  constructor(
    private inputLabeledTextManager: InputLabeledTextManagerService,
    private textClassifierService: TextClassifierService) {
  }

  ngOnInit() {
        
  }

  getState(){
    return this.textClassifierService.getState();
  }

  editModelName(){
    this.edit = true;
    setTimeout(() => {
      this.inputNameModel.nativeElement.focus();
    }, 0);

    
  }

  updateModelName(event){
    console.log(event);
    if(event.key=="Enter" || event.type=="blur"){
      this.edit = false;
    }
    
  }
}
