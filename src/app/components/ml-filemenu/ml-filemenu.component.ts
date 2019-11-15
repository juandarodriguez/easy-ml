import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { InputLabeledTextManagerService } from 'src/app/services/input-labeled-text-manager.service';
import { saveAs } from 'file-saver';
import { TextClassifierService } from 'src/app/services/text-classifier.service';
import { Observable, from } from 'rxjs';
import { ShowProgressSpinnerService } from '../../services/show-progress-spinner.service';

@Component({
  selector: 'app-ml-filemenu',
  templateUrl: './ml-filemenu.component.html',
  styleUrls: ['./ml-filemenu.component.css']
})
export class MlFilemenuComponent implements OnInit {

  @ViewChild('fileElement') fileElement: ElementRef;
  
  constructor(public authService: AuthenticationService,
    public inputLabeledTextManager: InputLabeledTextManagerService,
    private textClassifierService: TextClassifierService,
    private progressSpinner: ShowProgressSpinnerService) {
  }

  new(){
    window.location.reload();
  }

  load() {
    this.fileElement.nativeElement.click();
  }
  
  save() {
    const blob = new Blob([this.serializeModel()], { type: 'application/json' });
    saveAs(blob, this.inputLabeledTextManager.name);
  }

  getState() {
    return this.textClassifierService.getState();
  }

  serializeModel(): string {
    let dataObject = {};

    for (let label of this.inputLabeledTextManager.labelsWithTexts.keys()) {
      dataObject[label] = [];
      for (let text of this.inputLabeledTextManager.labelsWithTexts.get(label)) {
        dataObject[label].push(text);
      }
    }
    let dataJSON = JSON.stringify(dataObject);

    return dataJSON;
  }

  onLoaded(e) {
    let file = e.target.files[0];
    let inputDataName = file.name.replace(/\.[^/.]+$/, "");
    this.inputLabeledTextManager.name = inputDataName;
    let fileReader = new FileReader();

    fileReader.readAsText(file);

    console.log("empieza");

    let promise = new Promise((resolve, error) => {
      fileReader.onload = (e) => {
        console.log(fileReader.result);
        this.inputLabeledTextManager.load(fileReader.result.toString());
        // This creates a new model
        this.textClassifierService.clear();
        this.textClassifierService.setTraindata(this.inputLabeledTextManager.labelsWithTexts)
        resolve(true);
      }
    }).then(() => {
      return true;
    },
      () => {
        return false;
      });

    let loadObservable = from(promise);

    let d = this
      .progressSpinner
      .showProgressSpinnerUntilExecuted(loadObservable,
        "Cargando archivo", "assets/images/loading.gif",
        "Fichero cargado", "");

  }

  ngOnInit() {
  }

}
