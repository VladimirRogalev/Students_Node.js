import express, {Application} from 'express';
import studentRoutes from './routes/studentRoutes';
import errorMiddleware from './middleware/errorMiddleware';

const app: Application = express();
const PORT = 8080;

app.use(express.json());

app.use(studentRoutes);

app.use(errorMiddleware);

app.listen(PORT, ()=> {
    console.log(`http://localhost:${PORT}`);
})