import express, { Router } from "express"
import { 
   getMaKnowledgeData, 
   getMyKnowledgeData, 
   addMyKnowledgeData,
   updateMyKnowledgeData} from '../controller/ProfessionalStatusController.js';
import isAuth from "../middleware/is-auth.js";

const router = Router();

router.route("/")
   .post(addMyKnowledgeData);
router.route("/:id")
   .patch(/* isAuth,  */updateMyKnowledgeData)
   .get(/* isAuth, */ getMyKnowledgeData)
router.route("/marketknowledge")
   .get(getMaKnowledgeData);
export default router

