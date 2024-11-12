import express, { Router } from "express"
import { getAuthorsInfo, getAllAuthorsInfo } from '../controller/contactsController.js';
//import isAuth from "../middleware/is-auth.js";

const router = Router();

router.route("/")
    .get( getAllAuthorsInfo );
router.route("/:id")
    .get( getAuthorsInfo );

export default router