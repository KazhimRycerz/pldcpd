import express, { Router } from "express"
import { getAllContacts, registerContact, updateContact, getContact} from '../controller/contactsController.js'


const router = Router()
router
.get("/list", getAllContacts )
.get("/", getAllContacts )
.post("/register", registerContact )
.patch("/:id", updateContact)
.get("/:id", getContact);

export default router
