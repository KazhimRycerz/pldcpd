import express, { Router } from "express"
import { getAllCompanies, registerCompany, updateCompany, getCompany} from '../controller/companiesController.js'


const router = Router()
router
.get("/list", getAllCompanies )
.get("/", getAllCompanies )
.post("/", registerCompany )
.patch("/:id", updateCompany)
.get("/:id", getCompany);

export default router
