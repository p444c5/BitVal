import { Router } from "express";
import ExchangeController from "../controllers/exchangeController";
import ParticipantController from "../controllers/participantController";
import { Application } from "express-serve-static-core";
import multer from "multer";

const router = Router();
const upload = multer({ dest: 'uploads/' }); 
const exchangeController = new ExchangeController();
const participantController = new ParticipantController();

// router.post("/pair", exchangeController.pairParticipants);

// router.post("/allocate", exchangeController.allocateGifts);

router.get("/participants", participantController.getAllParticipants);

router.post("/newparticipant", participantController.addParticipant);
  
// router.post("/participants/bulk-upload", upload.single('file'), participantController.bulkUploadParticipants);

// router.post("/participant/update/:id", participantController.updateParticipant);

// router.delete("/participant/delete/:id", participantController.deleteParticipant);


const setRoutes = (app:Application) => {
  app.use("/api", router);
};

export default setRoutes;
