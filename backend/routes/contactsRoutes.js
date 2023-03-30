import express, { Router } from "express"
import { getAllContacts, addContact, updateContact, getContact} from '../controller/contactsController.js'
import isAuth from "../middleware/is-auth.js";

const router = Router();

router.route("/")
    .get(getAllContacts )
    .post(addContact );
router.route("/:id")
    .patch(isAuth, updateContact)
    .get(isAuth, getContact);

export default router