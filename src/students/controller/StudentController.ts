import StudentService from '../services/StudentService';
import Student from '../models/Student';
import NewStudentDto from '../dto/NewStudentDto';
import StudentDto from '../dto/StudentDto';
import UpdateStudentDto from '../dto/UpdateStudentDto';
import ScoreDto from '../dto/ScoreDto';


export default class StudentController {
    private studentService: StudentService;


    constructor(studentService: StudentService) {
        this.studentService = studentService;
    }

    addStudent(studentDto: NewStudentDto) :boolean {
        const student: Student = new Student(studentDto.id, studentDto.name, studentDto.password);
        return this.studentService.addStudent(student);
    }

    deleteStudent(id: number) :StudentDto {
        return this.studentService.deleteStudent(id);
    }

    getStudent(id: number): StudentDto {
        const student = this.studentService.getStudent(id);
        return new StudentDto(student.id, student.name, Object.fromEntries(student.scores));
    }
    getStudentsByName(name: string): StudentDto[] {
        const students: Student[] = this.studentService.getStudentsByName(name);
        return students.map(value => new StudentDto(value.id, value.name, Object.fromEntries(value.scores)));
    }

    updateStudent(id: number, studentDto: UpdateStudentDto): NewStudentDto {
        return this.studentService.updateStudent(id, studentDto.name, studentDto.password);
    }

    addScore(id: number, studentDto: ScoreDto): boolean {
        return this.studentService.addScore(id, studentDto.examName, studentDto.score);
    }

    getQuantityStudents(names: string[]) {
        return this.studentService.getQuantityStudents(names);
    }

    findStudentsByMinScore(exam: string, minScore: number): StudentDto[] {
        const students = this.studentService.findStudentsByMinScore(exam, minScore);
        return students.map(v => new StudentDto(v.id, v.name, Object.fromEntries(v.scores)));
    }
}