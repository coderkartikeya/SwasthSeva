import express from "express";
import {login, signup,medicalRecord,getMedicalRecord, updateMedicalRecord,check, profile} from "../controllers/user.controllers.js"



const router = express.Router();

router.get("/check",check)
router.post("/signup", signup);

router.post("/login", login);

router.post("/profile",profile );

router.put("/updatePatientProfile/:id", updateMedicalRecord);


router.post("/medicalRecord", medicalRecord);





export default router;