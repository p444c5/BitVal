import express from 'express';
import setRoutes from './routes/api';
import { connectToDatabase } from './db/database';
import corsOption from './config/corsOption';   
import cors from 'cors'; 
import morgan from 'morgan';
import cookieParser from 'cookie-parser';


const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("dev"));

app.use(cors(corsOption)); 

app.use(cookieParser());
// app.use(express.static("public"));
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));


setRoutes(app);


connectToDatabase()
    .then(() => {
        app.listen(PORT, () => { 
            console.log(`Server is up and running on port ${PORT}`); 
        });
    })
    .catch((err: any) => {
        console.error("Critical Error: Database connection failed.");
        console.error(err);
        process.exit(1); 
    });