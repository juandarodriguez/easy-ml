import { Component, OnInit } from '@angular/core';
import { IConfiguration, ITextModel } from 'src/app/interfaces/interfaces';
import { TextClasifyerService, configDefault } from 'src/app/services/text-clasifyer.service';

@Component({
  selector: 'app-ml-configuration',
  templateUrl: './ml-configuration.component.html',
  styleUrls: ['./ml-configuration.component.css']
})
export class MlConfigurationComponent implements OnInit {

  config: IConfiguration;
  model: ITextModel;

  jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
  }

  constructor(private textClasifyerService: TextClasifyerService) { 
    this.config = this.jsonCopy(configDefault);
    this.model = textClasifyerService.getModel();
  }

  ngOnInit() {
  }

  update() {
    this.textClasifyerService.configure(this.config);
    this.textClasifyerService.train().subscribe(r => {
      let mensaje = `Modelo entrenado con los nuevos parámetros.
      Error cometido: ${r.error}
      Iteraciones: ${r.iterations}`
      alert(mensaje);
    });
  }

  reset(){
    this.config = this.jsonCopy(configDefault);
    
    this.textClasifyerService.configure(this.config);
  }

}
