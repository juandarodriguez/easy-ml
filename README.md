# EasyMl

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Issues
https://github.com/BrainJS/brain.js/issues/326


## Cómo instalar y desarrollar scratch3

git clone https://github.com/juandarodriguez/scratch-vm.git
git clone https://github.com/juandarodriguez/scratch-blocks.git
git clone https://github.com/juandarodriguez/scratch-gui.git

cd scratch-blocks
npm install
npm link

cd ..
cd scratch-vm
npm install
npm link
npm link scratch-blocks

cd ..
cd scratch-gui
npm install
npm link scratch-blocks
npm link scratch-vm

npm start

Se inicia la interfaz de scratch con los módulos scratch-vm y 
scratch-blocks, apuntando a las copias que acabamos de bajar.




## El código que me ha servido de modelo para el clasificado basado en red neuronal con bag of words

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