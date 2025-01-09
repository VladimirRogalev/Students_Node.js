export default class ScoreDto {
    examName: string;
    score: number;

    constructor(examName: string, score: number) {
        this.examName = examName;
        this.score = score;
    }
}