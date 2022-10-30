import { Option } from './option';
export class Question {
    id: number;
    name: string;
    createdAt: string;
    questionTypeId: number;
    hasNext: boolean;
    nextQuestion: Question[];
    options: Option[];
    explanation: string;

    constructor(id,name,createdAt,questionTypeId,hasNext,nextQuestion,options,explanation) {
        //check for id using createdAt
        this.id = id;
        this.name = name;
        this.createdAt = createdAt;
        this.questionTypeId = questionTypeId;
        this.hasNext = hasNext;
        this.nextQuestion = nextQuestion;
        this.options = options;
        this.explanation = explanation;
    }
}
