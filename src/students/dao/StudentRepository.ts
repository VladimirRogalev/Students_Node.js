import Student from '../models/Student';
import * as fs from 'node:fs';

export default class StudentRepository {
    private readonly filePath: string;


    constructor(filePath = './db.txt') {
        this.filePath = filePath;
    }

    readAll(): Student[] {
        try {
            const res = fs.readFileSync(this.filePath, {encoding: 'utf-8'});
            const students = JSON.parse(res) as Student[];
            return students.map(student => {
                const studentInstance = new Student(student.id, student.name, student.password);
                studentInstance.scores = new Map(Object.entries(student.scores || {}));
                return studentInstance;
            });
        } catch (err: any) {
            console.error(`Error -> ${err}`);
            return [];
        }
    }

    // write(student:Student){
    //     try {
    //         const students = this.readAll();
    //         students.push(student);
    //         this.writeAll(students);
    //         return true;
    //     } catch (err:any) {
    //         console.error(err);
    //         return false;
    //     }
    // }

    writeAll(arg: Student[]): boolean {
        try {
            const data = JSON.stringify(arg.map(student => ({
                ...student,
                scores: Object.fromEntries(student.scores),
            })), null, 2);
            fs.writeFileSync(this.filePath, data, {encoding: 'utf-8'});
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}