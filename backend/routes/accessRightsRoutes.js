import express, { Router } from "express"
import { getAllAccessRights, getAccessRight, addAccessRight, updateAccessRight, deleteAccessRight} from '../controller/accessRightsController.js'


const router = Router()
/* router
.get("/", getAllCompanies )
.post("/", registerCompany )
.patch("/:id", updateCompany)
.get("/:id", getCompany); */

router.route("/")
    .get(getAllAccessRights )
    .post(addAccessRight);
router.route("/:id")
    .patch(updateAccessRight)
    .get(getAccessRight)
    .delete(deleteAccessRight)

export default router
