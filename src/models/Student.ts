interface Score {
    math: number;
    eng:number;
    art:number;
}

export default class Student {

    private readonly _id: number;
    private _name: string;
    private _scores: Score


    constructor(id: number, name: string, scores: Score) {
        this._id = id;
        this._name = name;
        this._scores = scores;
    }


    get id(): number {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get scores(): Score {
        return this._scores;
    }

    set name(value: string) {
        this._name = value;
    }

    set scores(value: Score) {
        this._scores = value;
    }
}
