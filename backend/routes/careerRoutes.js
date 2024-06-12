import express, { Router } from "express"
import { getAllCareers, addCareer, updateCareer, getCareerOfContact, getCareer} from '../controller/careerController.js'


const router = Router()
router
.get("/list", getAllCareers )
.get("/", getAllCareers )
.post("/addcareerstep", addCareer )
.patch("/:id", updateCareer)
.get("/contact/:contact", getCareerOfContact)
.get("/:id", getCareer);

export default router
