import { CorsOptions } from 'cors'; 
import allowedOrigins from "./allowedOrigins";

const corsOption: CorsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // !origin allows requests from non-browser sources (like Postman or server-to-server)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
}

export default corsOption;