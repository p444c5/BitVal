import { Router } from "express";
import ExchangeController from "../controllers/exchangeController";
import ParticipantController from "../controllers/participantController";
import AuthController from "../controllers/authController";
import { verifyJWT } from "../middleware/authMiddleware";
import { Application } from "express-serve-static-core";
import multer from "multer";

const router = Router();
const upload = multer({ dest: 'uploads/' }); 
const exchangeController = new ExchangeController();
const participantController = new ParticipantController();
const authController = new AuthController();

/* --- Auth Routes ---*/
router.post("/auth/login", authController.login);
router.post("/auth/refresh", authController.refreshToken);
router.post("/auth/logout", authController.logout);
router.post("/auth/create-admin", authController.createAdmin); 


/* --- Admin Routes --- */
const adminRouter = Router();
adminRouter.use(verifyJWT);

adminRouter.post("/pair", exchangeController.pairParticipants);
adminRouter.post("/allocate", exchangeController.allocateGifts);
adminRouter.post("/newparticipant", participantController.addParticipant);
adminRouter.post("/participants/bulk-upload", upload.single('file'), participantController.bulkUploadParticipants);
adminRouter.post("/participant/update/:id", participantController.updateParticipant);
adminRouter.delete("/participant/delete/:id", participantController.deleteParticipant);


router.use("/admin", adminRouter);



/* --- Public Routes --- */
router.get("/participants", participantController.getAllParticipants);


const setRoutes = (app:Application) => {
  app.use("/api", router);
};

export default setRoutes;
