import { Injectable, EventEmitter, Output } from '@angular/core';
import { ITextModel, State, IConfiguration, Data_Text, Data_Label, ITextData } from '../interfaces/interfaces';
import { TextBrainMLService } from './text-brain-ml.service';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TextClasifyerService {

  private model: ITextModel;

  constructor(private textMLEngine: TextBrainMLService) {
    this.model = {
      name: null,
      labels: new Map<Data_Label, Set<Data_Text>>(),
      state: State.UNTRAINED
    }
  }

  configure(config: IConfiguration) {
    this.textMLEngine.configure(config);
    if (this.model.state != State.UNTRAINED) {
      this.model.state = State.OUTDATED;
    }
  }

  setName(name: string) {
    this.model.name = name;
  }

  load(name: string): Observable<ITextModel> {

    this.model.name = name;

    this.model.labels.set('encender_lampara', new Set([
      "que me tocan el culo ",
      "enciende la luz",
      "esto está muy oscuro",
      "qué oscuridad",
      "dale a la luz",
      "enciende la lámpara",
      "se está poniendo el sol",
      "no veo nada",
      "necesito luz",
      "no hay suficiente luz"
    ]));

    this.model.labels.set('apagar_lampara', new Set([
      "apaga la luz",
      "apaga la lámpara",
      "hay demasiada luz",
      "menos luz",
      "desconecta la luz",
      "quiero estar en la oscuridad",
      "está demasiado claro",
      "mucha claridad",
      "me gusta la oscuridad",
      "prefiero la oscuridad",
      "veo muy bien"
    ]));

    this.model.labels.set('encender_ventilador', new Set([
      "qué sofocón",
      "enciende el ventilador",
      "hace mucho calor",
      "demasiado calor",
      "pon en marcha el ventilador",
      "qué calor",
      "conecta el ventilador",
      "me afixio",
      "me derrito",
      "dale caña al ventilador",
      "que bochorno",
      "me abraso",
      "que calor tan sofocante"
    ]));

    this.model.labels.set('apagar_ventilador', new Set([
      "estoy arrecío",
      "qué frío",
      "apaga el ventilador",
      "hace mucho viento",
      "hace mucho frío",
      "demasiado frío",
      "quita el ventilador",
      "me congelo",
      "me voy a resfriar",
      "hay mucha corriente",
      "tengo la carne de gallina",
      "me estoy quedando pajarito"
    ]));

    this.model.state == State.UNTRAINED;

    return of(this.model);

  }

  save(name?: string) {

  }

  addLabel(label: Data_Label) {
    this.model.labels.set(label, new Set<Data_Text>());
  }

  addEntry(data: ITextData) {
    this.model.labels.set(data.label, this.model.labels.get(data.label).add(data.text));
    if (this.model.state != State.UNTRAINED) {
      this.model.state = State.OUTDATED;
    }
  }

  addEntries(data: Set<ITextData>) {
    for (let d of data) {
      this.addEntry(d);
    }
    if (this.model.state != State.UNTRAINED) {
      this.model.state = State.OUTDATED;
    }
  }

  removeLabel(label: Data_Label) {
    this.model.labels.delete(label);
    if (this.model.labels.get(label).entries.length != 0) {
      if (this.model.state != State.UNTRAINED) {
        this.model.state = State.OUTDATED;
      }
    }
  }

  removeEntry(data: ITextData) {
    this.model.labels.get(data.label).delete(data.text);
    if (this.model.state != State.UNTRAINED) {
      this.model.state = State.OUTDATED;
    }
  }

  train() {
    if (this.model.state == State.OUTDATED || this.model.state == State.UNTRAINED) {
      this.textMLEngine.train(this.model);
      this.model.state = State.TRAINED;
    }
  }

  run(text: Data_Text): Data_Label {
    return this.textMLEngine.run(text);
  }

  getModel() {
    return this.model;
  }
}
