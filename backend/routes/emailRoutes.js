import express, { Router } from "express"
import { postEmail, getEmail } from '../controller/emailController.js'


const router = Router()
router
    .post("/", postEmail )
    .get("/", getEmail )

export default router
