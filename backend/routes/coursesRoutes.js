import express, { Router } from "express"
import { getAllCourses, addCourse, updateCourse, getCourse, getFilteredCourselist} from '../controller/coursesController.js'


const router = Router()
/* router
.get("/", getAllCompanies )
.post("/", registerCompany )
.patch("/:id", updateCompany)
.get("/:id", getCompany); */

router.route("/")
    .get(getAllCourses )
    .post(addCourse);
router.route("/courselist")
    .get(getFilteredCourselist )
router.route("/:id")
    .patch(updateCourse)
    .get(getCourse);

export default router
