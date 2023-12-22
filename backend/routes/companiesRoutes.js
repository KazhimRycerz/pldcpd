import express, { Router } from "express"
import { deleteCompany, getAllCompanies, registerCompany, updateCompany, getCompany} from '../controller/companiesController.js'


const router = Router()
router.route("/")
   .get(getAllCompanies)
   .post(registerCompany);
router.route("/list")
   .get(getAllCompanies);
router.route("/:id")
   .patch(updateCompany)
   .get(getCompany)
   .delete(deleteCompany);

export default router