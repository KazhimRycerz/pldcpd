import express, { Router } from "express"
import { 
   getMaKnowledgeData, 
   getMyKnowledgeData, 
   addMyKnowledgeData,
   updateMyKnowledgeData} from '../controller/knowledgeController.js'

const router = Router()
router
.get("/maList", getMaKnowledgeData )
.get("/myList", getMyKnowledgeData )
.post("/addMyList", addMyKnowledgeData )
.patch("/:id", updateMyKnowledgeData)
.get("/:id", getMyKnowledgeData);

export default router
