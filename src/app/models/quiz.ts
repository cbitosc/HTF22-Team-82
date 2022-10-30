import { Question } from './question';
export class Quiz {
    id: number;
    name: string;
    description: string;
    createdBy: string;
    createdOn: string;
    popularity: number;
    maxMarks: number;
    time: number;
    questions: Question[];

    constructor(id,name,description,createdBy,createdOn,popularity=0,maxMarks,time,questions) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdBy = createdBy;
        this.createdOn = createdOn;
        this.popularity = popularity;
        this.maxMarks = maxMarks;
        this.time = time;
        this.questions = questions;
    }
}
