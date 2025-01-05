import {Router} from 'express';
import StudentController from '../controller/StudentController';
import StudentServiceImpl from '../services/StudentServiceImpl';
import {body, param, query} from 'express-validator';
import validationMiddleware from '../middleware/validationMiddleware';
import asyncHandler from 'express-async-handler';


const router = Router();

const studentService = new StudentServiceImpl();
const studentController = new StudentController(studentService);
router.post('/student',
    body('id').isInt().notEmpty(),
    body('name').isString().notEmpty(),
    body('password').isInt().notEmpty(),
    validationMiddleware, asyncHandler(async (req, res) => {
        const studentDto = req.body;
        const isSuccess = await studentController.addStudent(studentDto);
            res.status(200).send(isSuccess)

    }));
router.delete('/student/:id',
    param('id').isInt().notEmpty(),
    validationMiddleware,
    asyncHandler(async (req, res, next) => {
        const id = req.params.id;
        const student = await studentController.deleteStudent(Number(id));
        if (student) {
            res.status(200).json({id:student.id, name:student.name});
        } else {
            const error = new Error(`Student id: ${id} was not found`);
            (error as any).status = 404;
             next(error);
        }
    }));

router.get('/student/:id',
    param('id').isInt().notEmpty(),
    validationMiddleware,
    asyncHandler(async (req, res, next) => {
        const id= req.params.id;
                const student = await studentController.getStudent(Number(id));
                if (student) {
                    res.status(200).json({id:student.id, name:student.name});
                } else {
                    const error = new Error(`Student id: ${id} was not found`);
                    (error as any).status = 404;
                      next(error);
                    }

    }));

router.put('/student/:id',
    param('id').isInt().notEmpty(),
    body('name').isString(),
    body('password').isInt(),
    validationMiddleware, (req, res, next) => {
        const id= req.params.id;
        const studentDto = req.body;
        const student = studentController.updateStudent(+id, studentDto);
        if (student) {
            res.status(200).send(student);
        } else {
            const error = new Error(`Student id: ${id} was not found`);
            (error as any).status = 404;
            next(error);
        }
    });
router.get('/quantity/students',
    asyncHandler(async (req, res) => {
        const students = await studentController.getQuantityStudents();
        if (students) {
            res.status(200).send(`Students = ${students}`);
        }
    }));

router.get('/students',
    query('exam').isString().notEmpty(),
    validationMiddleware,
    asyncHandler(async (req, res) => {
        const  {exam}= req.query;
        const students =  studentController.getAverageScoreByExam(exam as string);
        if (students) {
            res.status(200).send(`Average ${exam} score  = ${students}`);
        }
    }));



export default router;