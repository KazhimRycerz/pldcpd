import express, { Router } from "express"
import { getAllAuthors, addAuthor, updateAuthor, getAuthor} from '../controller/authorsController.js'
import isAuth from "../middleware/is-auth.js";

const router = Router();

router.route("/")
    .get(getAllAuthors )
    .post(addAuthor );
router.route("/:id")
    .patch(isAuth, updateAuthor)
    .get(isAuth, getAuthor);

export default router