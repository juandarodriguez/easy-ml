import { Component, OnInit, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TextClasifyerService } from 'src/app/services/text-clasifyer.service';
import { ITextModel } from '../../interfaces/interfaces';

@Component({
  selector: 'app-ml-model-toolbar',
  templateUrl: './ml-model-toolbar.component.html',
  styleUrls: ['./ml-model-toolbar.component.css']
})
export class MlModelToolbarComponent implements OnInit {

  model: ITextModel;
  edit = false;
  @ViewChild("inputNameModel") inputNameModel: ElementRef;

  constructor(private textClasifyerService: TextClasifyerService) {
    this.model = this.textClasifyerService.model;
  }

  ngOnInit() {
        
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
