export enum State {
    UNTRAINED,
    TRAINED,
    OUTDATED
}

export type Label = string
export type Text = string

export interface ITextModel {
    name: string,
    labels: Label[],
    data: ITextData[],
    state: State
}

export interface ITextData {
    text: Text,
    label: Label
}

export interface IConfiguration {
    iterations: number,      // the maximum times to iterate the training data --> number greater than 0
    errorThresh: number,     // the acceptable error percentage from training data --> number between 0 and 1
    learningRate: number,    // scales with delta to effect training rate --> number between 0 and 1
    momentum: number,        // scales with next layer's change value --> number between 0 and 1
}

export interface IEngine {
    configure(c: IConfiguration): any,
    getConfiguration(): IConfiguration,
    modelToString(): string
}

export interface ITextEngine extends IEngine {
    run(entry: Text): Label,
    train(data: ITextData[]): any,
}