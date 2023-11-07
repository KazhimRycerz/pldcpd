import express, { Router } from "express"
import { addCourseType, getAllCourseTypes, getCourseType, updateCourseType, deleteCourseType } from '../controller/courseTypeController.js'


const router = Router()
/* router
.get("/", getAllCompanies )
.post("/", registerCompany )
.patch("/:id", updateCompany)
.get("/:id", getCompany); */

router.route("/")
    .get(getAllCourseTypes )
    .post(addCourseType);
router.route("/:id")
    .patch(updateCourseType)
    .get(getCourseType)
    .delete(deleteCourseType)

export default router
