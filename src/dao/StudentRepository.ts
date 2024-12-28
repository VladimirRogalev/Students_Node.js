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
            return JSON.parse(res) as Student[];
        } catch (err: any) {
            console.error(`Error -> ${err}`);
            return []
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

    writeAll(students: Student[]):boolean {
        try{
            const data = JSON.stringify(students, null,2);
            fs.writeFileSync(this.filePath, data, {encoding:'utf-8'});
            console.log("Success");
            return true;
        }catch (err) {
            console.error(err);
            return false;
        }
    }
}