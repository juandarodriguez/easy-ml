export enum State {
    UNTRAINED = "UNTRAINED",
    TRAINED = "TRAINED",
    OUTDATED = "OUTDATED",
    EMPTY = "EMPTY",
    TRAINING = "TRAINING"
}

export type TLabel = string
export type TText = string

export interface ILabeledText {
    text: TText,
    label: TLabel
}

// Interface describing the input text with label which user provides
// through GUI or file.
export interface IInputFileLabeledTexts {
    id: string,
    name?: string,
    labels?: Map<TLabel, Set<TText>>,
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
    text: TText,
    label: TLabel,
    confidence: number,
    prediction: Map<TLabel, number>
}

export interface IEngine {
    setConfiguration(c: IConfiguration): boolean
}

export interface ITextEngine extends IEngine {
    run(entry: TText): IRunResult,
    train(traindata: ILabeledText[]): any,
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