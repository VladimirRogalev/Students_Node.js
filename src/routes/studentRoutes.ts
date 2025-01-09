import {Router} from 'express';
import StudentController from '../students/controller/StudentController';
import StudentServiceImpl from '../students/services/StudentServiceImpl';
import {body, param} from 'express-validator';
import validationMiddleware from '../students/middleware/validationMiddleware';
import expressAsyncHandler from 'express-async-handler';
import NewStudentDto from '../students/dto/NewStudentDto';
import StudentDto from '../students/dto/StudentDto';
import UpdateStudentDto from '../students/dto/UpdateStudentDto';
import ScoreDto from '../students/dto/ScoreDto';


const router = Router();

const studentService = new StudentServiceImpl();
const studentController = new StudentController(studentService);
router.post('/student', body('id').isInt().notEmpty(), body('name').isString().notEmpty(), body('password').isInt().notEmpty(), validationMiddleware, expressAsyncHandler(async (req, res) => {
    const studentDto = req.body as NewStudentDto;
    const isSuccess = studentController.addStudent(studentDto);
    res.status(200).send(isSuccess);

}));
router.delete('/student/:id', param('id').isInt().notEmpty(), validationMiddleware, expressAsyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const student: StudentDto = studentController.deleteStudent(id);
    if (student) {
        res.status(200).json({id: student.id, name: student.name});
    } else {
        const error = new Error(`Student id: ${id} was not found`);
        (error as any).status = 404;
        next(error);
    }
}));

router.get('/student/:id', param('id').isInt().notEmpty(), validationMiddleware, expressAsyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const student: StudentDto = studentController.getStudent(id);
    if (student) {
        res.status(200).send(student);//json({id:student.id, name:student.name});
    } else {
        const error = new Error(`Student id: ${id} was not found`);
        (error as any).status = 404;
        next(error);
    }

}));

router.put('/student/:id', param('id').isInt().notEmpty(), body('name').isString(), body('password').isInt(), validationMiddleware, (req, res, next) => {
    const id = +req.params.id;
    const studentDto = req.body as UpdateStudentDto;
    const student: NewStudentDto = studentController.updateStudent(id, studentDto);
    if (student) {
        res.status(200).send(student);
    } else {
        const error = new Error(`Student id: ${id} was not found`);
        (error as any).status = 404;
        next(error);
    }
});
router.put('/score/student/:id', param('id').isInt().notEmpty(), validationMiddleware, expressAsyncHandler(async (req, res, next) => {
    const id = +req.params.id;
    const studentDto = req.body as ScoreDto;
    const isSuccess = studentController.addScore(id, studentDto);
    if (isSuccess) {
        res.status(200).send(true);
    } else {
        const error = new Error(`Student id: ${id} was not found`);
        (error as any).status = 404;
        next(error);
    }
}));
router.get('/students/name/:name', param('name').isString(), validationMiddleware, expressAsyncHandler(async (req, res) => {
    const name = req.params.name;
    const studentsByName: StudentDto[] = studentController.getStudentsByName(name);
    res.status(200).send(studentsByName);
}));

router.post('/quantity/students', expressAsyncHandler(async (req, res) => {
    const names = req.body as string[];
    const quantity = studentController.getQuantityStudents(names);
    res.status(200).send(quantity.toString());
}));

router.get('/students/exam/:exam/minscore/:minscore',

    expressAsyncHandler(async (req, res) => {
        const exam = req.params.exam;
        const minScore: number = +req.params.minscore;
        const students = studentController.findStudentsByMinScore(exam, minScore);
        res.status(200).send(students);
    }));


export default router;