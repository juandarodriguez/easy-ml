import { Injectable } from '@angular/core';
import { ITextModel, State, IConfiguration, Data_Text, Data_Label, ITextData } from '../interfaces/interfaces';
import { TextBrainMLService } from './text-brain-ml.service';
import { trigger } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class TextClasifyerService {

  private model: ITextModel;

  constructor(private textMLEngine: TextBrainMLService) { 
    this.model = {
      name: name,
      data: new Set<ITextData>(),
      state: State.UNTRAINED
    }
  }

  configure(config: IConfiguration){
      this.textMLEngine.configure(config);
  }

  setName(name: string){
    this.model.name = name;
  }

  load(name: string){
    this.model = {
      name: 'el modelo',
      data: new Set<ITextData>(
        [
          { text: "que me tocan el culo ", label: "encender_lampara" },
          { text: "enciende la luz", label: "encender_lampara" },
          { text: "esto está muy oscuro", label: "encender_lampara" },
          { text: "qué oscuridad", label: "encender_lampara" },
          { text: "dale a la luz", label: "encender_lampara" },
          { text: "enciende la lámpara", label: "encender_lampara" },
          { text: "se está poniendo el sol", label: "encender_lampara" },
          { text: "no veo nada", label: "encender_lampara" },
          { text: "necesito luz", label: "encender_lampara" },
          { text: "no hay suficiente luz", label: "encender_lampara" },
  
          { text: "apaga la luz", label: "apagar_lampara" },
          { text: "apaga la lámpara", label: "apagar_lampara" },
          { text: "hay demasiada luz", label: "apagar_lampara" },
          { text: "menos luz", label: "apagar_lampara" },
          { text: "desconecta la luz", label: "apagar_lampara" },
          { text: "quiero estar en la oscuridad", label: "apagar_lampara" },
          { text: "está demasiado claro", label: "apagar_lampara" },
          { text: "mucha claridad", label: "apagar_lampara" },
          { text: "me gusta la oscuridad", label: "apagar_lampara" },
          { text: "prefiero la oscuridad", label: "apagar_lampara" },
          { text: "veo muy bien", label: "apagar_lampara" },
          
          { text: "qué sofocón", label: "encender_ventilador" },
          { text: "enciende el ventilador", label: "encender_ventilador" },
          { text: "hace mucho calor", label: "encender_ventilador" },
          { text: "demasiado calor", label: "encender_ventilador" },
          { text: "pon en marcha el ventilador", label: "encender_ventilador" },
          { text: "qué calor", label: "encender_ventilador" },
          { text: "conecta el ventilador", label: "encender_ventilador" },
          { text: "me afixio", label: "encender_ventilador" },
          { text: "me derrito", label: "encender_ventilador" },
          { text: "dale caña al ventilador", label: "encender_ventilador" },
          { text: "que bochorno", label: "encender_ventilador" },
          { text: "me abraso", label: "encender_ventilador" },
          { text: "que calor tan sofocante", label: "encender_ventilador" },
          
          { text: "estoy arrecío", label: "apagar_ventilador" },
          { text: "qué frío", label: "apagar_ventilador" },
          { text: "apaga el ventilador", label: "apagar_ventilador" },
          { text: "hace mucho viento", label: "apagar_ventilador" },
          { text: "hace mucho frío", label: "apagar_ventilador" },
          { text: "demasiado frío", label: "apagar_ventilador" },
          { text: "quita el ventilador", label: "apagar_ventilador" },
          { text: "me congelo", label: "apagar_ventilador" },
          { text: "me voy a resfriar", label: "apagar_ventilador" },
          { text: "hay mucha corriente", label: "apagar_ventilador" },
          { text: "tengo la carne de gallina", label: "apagar_ventilador" },
          { text: "me estoy quedando pajarito", label: "apagar_ventilador" },
        ]),
        state: State.UNTRAINED
    }
  }

  save(name?: string){
  
  }

  addEntry(text: Data_Text, label: Data_Label){
    this.model.data.add({text, label})
  }

  addEntries(data: Set<ITextData>){
    this.model.data = new Set([...this.model.data, ...data]);
  }

  removeLabel(label: Data_Label){ 
      this.model.data.forEach(e => {
        if(e.label == label){
          this.model.data.delete(e)
        }
      })
  }

  removeEntry(entry: ITextData){
    this.model.data.delete(entry);
  }

  train(){
    this.textMLEngine.train(this.model.data)
  }

  run(text: Data_Text): Data_Label {
    return this.textMLEngine.run(text);
  }

  getModel(){
    return this.model;
  }
}
