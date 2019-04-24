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

## El problema de la actualización del modelo de ML en los bloques de Scratch

Necesito que desde scratch se pueda leer el modelo que se ha creado en easyML.
Este modelo es un JSON. Por otro lado, cuando el script de scratch ha sido
cargado desde un archivo sb3 que contiene un modelo construido con easyML, debe tenerse en cuenta este modelo.

Impondré las siguientes reglas:

- si existe un modelo útil (entrenado o desactualizado) en easyML, Scratch debe tener en cuenta este modelo, y actualizar su propiedad `runtime.easyml_model` (que es donde guarda el modelo para que pueda almacenarse en un fichero sb3) con dicho modelo.

- si no existe un modelo útil en easyML, Scratch usará el modelo que está grabado en el fichero sb3 que haya cargado.

Teniendo en cuenta estas dos reglas puedo realizar la siguiente implementación.

EasyML guarda el modelo (JSON) que va construyendo en una propiedad del localStorage (easyml_model, por ejemplo).

Cuando el bloque de ML de Scratch lo necesite, leerá el modelo de esta propiedad. Como NO ES POSIBLE compartir el localStorage cuando los dominios de las dos ventanas son distintos hay que buscar una manera de comunicación que supere ese problema. 

La forma en que he resuelto el problema es mediante la librería "cross-domain-storage", que usa un truco basado en la comunicación entre ventanas de distinto dominio con `postMessage()` para emular la compartición de entradas del localStorage entre dominios distintos.

He añadido un servicio denominado `CrossDomainStorageService` que se encarga de levantar la infraestructura necesaria para que esto funcione. Es importante que cualquier entrada del localStorage que quiera compartir con otro dominio (por lo pronto solo easyml_model), sea creada con la función `set()` del servicio  `CrossDomainStorageService`. Las entradas creadas directamente con `localStorage.setItem()`, según mis pruebas, no se comparten con otros dominios. 
 

## Casos de uso para probar la carga del modelo correcto en Scratch

1. Abrir easyML -> Cargar modelo -> Entrenar -> Abrir Scratch. El modelo de Scratch debe ser el modelo recien entrenado.

2. A partir del anterior -> Cambiar modelo -> Entrenar -> Scratch Abierto. El modelo de Scratch debe actualizarse.

3. EasyML cerrado -> Abrir Scratch -> Abrir script con bloques de ML. El modelo de Scratch debe ser el almacenado en el fichero sb3. Atención cuando se cierra easyML se debe borrar la entrada "easyml_model" del localStorage.

4. EasyML cerrado -> Abrir Scratch -> Abrir script con bloques de ML -> abrir easyML -> entrenar modelo. El modelo de Scratch debe ser el nuevo modelo entrenado.

5. EasyML cerrado -> Abrir Scratch -> usar bloques ML. No hay modelo y Scratch debe advertirlo.
