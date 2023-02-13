import express, { Router } from "express"
import { getAllPersons, registerPerson, updatePerson, getPerson} from '../controller/personsController.js'


const router = Router()
router
.get("/list", getAllPersons )
.get("/", getAllPersons )
.post("/register", registerPerson )
.patch("/:id", updatePerson)
.get("/:id", getPerson);

export default router
