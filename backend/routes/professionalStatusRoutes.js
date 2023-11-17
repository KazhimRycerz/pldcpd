import express, { Router } from "express"
import { 
   getMaKnowledgeData, 
   getMyKnowledgeData, 
   addMyKnowledgeData,
   updateMyKnowledgeData, 
   /* addProfessionalStatus */} from '../controller/professionalStatusController.js';
import isAuth from "../middleware/is-auth.js";

const router = Router();

router.route("/")
   .post(addMyKnowledgeData)
   .get(getMaKnowledgeData)
router.route("/:id")
   .patch(/* isAuth,  */updateMyKnowledgeData)
   .get(/* isAuth, */ getMyKnowledgeData)
export default router

