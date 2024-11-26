import express, { Router } from "express"
import { getAllPACActivities, addPACActivity, updatePACActivity, getPACActivity, getFilteredPACActivityList, deletePACActivity} from '../controller/pacActivityController.js'


const router = Router()

router.route("/")
    .get(getAllPACActivities )
    .post(addPACActivity);
router.route("/courselist")
    .get(getFilteredPACActivityList )
router.route("/:id")
    .patch(updatePACActivity)
    .get(getPACActivity)
    .delete(deletePACActivity)

export default router
