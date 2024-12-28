import {Router} from 'express';
import StudentController from '../controller/StudentController';
import StudentServiceImpl from '../services/StudentServiceImpl';
import {body, query} from 'express-validator';
import validationMiddleware from '../middleware/validationMiddleware';
import asyncHandler from 'express-async-handler';



const router = Router();

const studentService = new StudentServiceImpl();
const studentController = new StudentController(studentService);
router.post('',
    body('id').isInt(),
    body('name').isString(),
    body('scores').isObject(),

    validationMiddleware, (req, res) => {
        const studentDto = req.body;
        const isSuccess = studentController.addStudent(studentDto);
        if (isSuccess) {
            res.status(200).send('Okay');
        } else {
            res.status(404).send(`Student with id: ${studentDto.id} is already exist`);
        }
    });
router.delete('',
    query("id").isInt(),
    validationMiddleware,
    asyncHandler(async (req, res) =>{
    const id = Number(req.query.id);
    const student = await studentController.deleteStudent(id);
    if(student){
        res.status(200).send({student});
    } else {
        res.status(404).send(`Student id: ${id} was not found`)
    }


}))


export default router;