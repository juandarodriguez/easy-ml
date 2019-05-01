export enum State {
    UNTRAINED = "UNTRAINED",
    TRAINED = "TRAINED",
    OUTDATED = "OUTDATED",
    EMPTY = "EMPTY",
    TRAINING = "TRAINING"
}

export type Data_Label = string
export type Data_Text = string

export interface ITextModel {
    id: string,
    name?: string,
    labels?: Map<Data_Label, Set<Data_Text>>,
    state: State
}

export interface ITextData {
    text: Data_Text,
    label: Data_Label
}

export enum Activation_Functions {
    SIGMOID = 'sigmoid',
    RELU = 'relu',
    LEAKY_RELU = 'leaky-relu', 
    TANH =  'tanh'
}

export interface IConfiguration {

    binaryThresh?: number,             // ¯\_(ツ)_/¯
    hiddenLayers?: number[],           // array of ints for the sizes of the hidden layers in the network
    activation?: Activation_Functions, // Supported activation types ['sigmoid', 'relu', 'leaky-relu', 'tanh']◊

    iterations?: number,               // the maximum times to iterate the training data
    errorThresh?: number,              // the acceptable error percentage from training data
    log?: boolean,                     // true to use console.log, when a function is supplied it is used
    logPeriod?: number,                // iterations between logging out
    learningRate?: number,             // multiply's against the input and the delta then adds to momentum
    momentum?: number,                 // multiply's against the specified "change" then adds to learning rate for change
    callback?: null,                   // a periodic call back that can be triggered while training
    callbackPeriod?: number,           // the number of iterations through the training data between callback calls
}

export interface IRunResult {
    text: Data_Text,
    label: Data_Label,
    confidence: number,
    prediction: Map<Data_Label, number>
}

export interface IEngine {
    setConfiguration(c: IConfiguration): boolean,
    modelToString(): string
}

export interface ITextEngine extends IEngine {
    run(entry: Data_Text): IRunResult,
    train(model: ITextModel): any,
}

export interface ITrainResult {
    error: number,
    iterations: number
}

export interface IAppConfig {
    env: {
        name: string;
    },
    scratch: {
        url: string,
        domain: string
    },
    easyml: {
        url: string,
        domain: string
    }
}