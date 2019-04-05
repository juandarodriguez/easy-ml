import { Component, OnInit } from '@angular/core';
import { TextClasifyerService } from 'src/app/services/text-clasifyer.service';
import { ITextData } from 'src/app/interfaces/interfaces';
import { BagOfWordsService } from 'src/app/services/bag-of-words.service';
import * as brain from 'brain.js';


@Component({
  selector: 'app-modelo',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.css']
})
export class ModelComponent implements OnInit {

  entry: string;

  constructor(private textClasifyerService: TextClasifyerService,
    private bow: BagOfWordsService) {
  }

  ngOnInit() {
    let texts =
      [
        // encender_lampara
        "que me tocan el culo",
        "enciende la luz",
        "esto está muy oscuro",
        "qué oscuridad",
        "dale a la luz",
        "enciende la lámpara",
        "se está poniendo el sol",
        "no veo nada",
        "necesito luz",
        "no hay suficiente luz",

        // apagar_lampara
        "apaga la luz",
        "apaga la lámpara",
        "hay demasiada luz",
        "menos luz",
        "desconecta la luz",
        "quiero estar en la oscuridad",
        "está demasiado claro",
        "mucha claridad",
        "me gusta la oscuridad",
        "prefiero la oscuridad"

       ]


    let ANN_Classes = {
      encender_lampara: 0,
      apagar_lampara: 1
    };
    let classes_array = Object.keys(ANN_Classes);

    let dict = this.bow.extractDictionary(texts);

    let traindata = [
      [this.bow.bow(texts[0], dict), ANN_Classes.encender_lampara],
      [this.bow.bow(texts[1], dict), ANN_Classes.encender_lampara],
      [this.bow.bow(texts[2], dict), ANN_Classes.encender_lampara],
      [this.bow.bow(texts[3], dict), ANN_Classes.encender_lampara],
      [this.bow.bow(texts[4], dict), ANN_Classes.encender_lampara],
      [this.bow.bow(texts[5], dict), ANN_Classes.encender_lampara],
      [this.bow.bow(texts[6], dict), ANN_Classes.encender_lampara],
      [this.bow.bow(texts[7], dict), ANN_Classes.encender_lampara],
      [this.bow.bow(texts[8], dict), ANN_Classes.encender_lampara],
      [this.bow.bow(texts[9], dict), ANN_Classes.encender_lampara],
      
      [this.bow.bow(texts[10], dict), ANN_Classes.apagar_lampara],
      [this.bow.bow(texts[11], dict), ANN_Classes.apagar_lampara],
      [this.bow.bow(texts[12], dict), ANN_Classes.apagar_lampara],
      [this.bow.bow(texts[13], dict), ANN_Classes.apagar_lampara],
      [this.bow.bow(texts[14], dict), ANN_Classes.apagar_lampara],
      [this.bow.bow(texts[15], dict), ANN_Classes.apagar_lampara],
      [this.bow.bow(texts[16], dict), ANN_Classes.apagar_lampara],
      [this.bow.bow(texts[17], dict), ANN_Classes.apagar_lampara],
      [this.bow.bow(texts[18], dict), ANN_Classes.apagar_lampara],
      [this.bow.bow(texts[19], dict), ANN_Classes.apagar_lampara]
    ];

    let test_enciende = 'enciende la luz pisha';
    let test_apaga = 'apaga la luz pishote';
    let test_bow_enciende= this.bow.bow(test_enciende, dict);
    let test_bow_apaga = this.bow.bow(test_apaga, dict);

    let net = new brain.NeuralNetwork(),
    ANN_train = traindata.map( pair => {
    return {
      input: pair[0],
      output: this.bow.vec_result(pair[1], 2)
    };
  });

    net.train(ANN_train);

    var predict = net.run(test_bow_enciende);
    console.log(predict);
    console.log(classes_array[this.bow.maxarg(predict)]);
    console.log(classes_array[this.bow.maxarg(net.run(test_bow_apaga))]);

  }

  dale() {
    const data = new Set<ITextData>(
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


      ]);

    this.textClasifyerService.addEntries(data);

    this.textClasifyerService.train();

    console.log(this.textClasifyerService.run("enciende la luz"));
  }

  run() {
    console.log(this.textClasifyerService.run(this.entry));
  }

}
