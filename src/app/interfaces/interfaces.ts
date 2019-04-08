export enum State {
    UNTRAINED,
    TRAINED,
    OUTDATED
}

export type Data_Label = string
export type Data_Text = string

export interface ITextModel {
    name: string,
    labels: Map<Data_Label, Set<Data_Text>>,
    state: State
}

export interface ITextData {
    text: Data_Text,
    label: Data_Label
}

export interface IConfiguration {
    iterations: number,      // the maximum times to iterate the training data --> number greater than 0
    errorThresh: number,     // the acceptable error percentage from training data --> number between 0 and 1
    learningRate: number,    // scales with delta to effect training rate --> number between 0 and 1
    momentum: number        // scales with next layer's change value --> number between 0 and 1
}

export interface IEngine {
    configure(c: IConfiguration): boolean,
    modelToString(): string
}

export interface ITextEngine extends IEngine {
    run(entry: Data_Text): Data_Label,
    train(model: ITextModel): any,
}