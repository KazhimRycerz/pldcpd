import express, { Router } from "express"
import { getAuthorsInfo } from '../controller/contactsController.js'
//import isAuth from "../middleware/is-auth.js";

const router = Router();

router.route("/:id")
    .get( getAuthorsInfo );

export default router