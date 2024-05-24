export interface IGuitarParams {
    material_fingerboard: string | string[];
    material_body: string | string[];
    form_body: string | string[];
    pickup_config?: string | string[];
    count_string: string | string[];
    color?: string | string[];
}

export interface IGuitarParamsValues {
    material_fingerboard: IParamsObject;
    material_body: IParamsObject;
    form_body: IParamsObject;
    pickup_config?: IParamsObject;
    count_string: IParamsObject;
    color?: IParamsObject;
}

export interface IParamsObject {
    name: string,
    array: string[]
}

export interface IPianoParams {
    material: string | string[];
    metronome?: string | string[];
    count_keys?: string | string[];
    type?: string | string[];
    record?: string | string[];
    color: string | string[];
}

export interface IPianoParamsValues {
    material: IParamsObject;
    metronome?: IParamsObject;
    count_keys?: IParamsObject;
    type?: IParamsObject;
    record?: IParamsObject;
    color: IParamsObject;
}

export interface IDrumsParams {
    material?: string | string[];
    diameter?: string | string[];
    color?: string | string[];
    type?: string | string[];
}

export interface IDrumsParamsValues {
    material?: IParamsObject;
    diameter?: IParamsObject;
    color?: IParamsObject;
    type?: IParamsObject;
}