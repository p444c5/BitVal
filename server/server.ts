import express from 'express';
import setRoutes from './routes/api';
import { connectToDatabase } from './db/database';
import corsOption from './config/corsOption';   
import cors from 'cors'; 
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';


const app = express();
const PORT = process.env.PORT || 8000;

app.use(morgan("dev"));

app.use(helmet()); 
app.set('trust proxy', 1);
const limiter: RateLimitRequestHandler = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, 
  standardHeaders: true, 
  legacyHeaders: false, 
  message: "Too many requests from this IP",
});
app.use(limiter);

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