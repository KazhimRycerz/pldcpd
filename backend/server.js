import express from 'express';
import connectMongoose from "./util/connectMogoose.js";
import  { unkownHandler, errorHandler } from './middleware/middelware.js';
import indexRouter from './routes/indexRoutes.js';
import userRouter from './routes/userRoutes.js';
import contactsRouter from './routes/contactsRoutes.js';
import authorsRouter from './routes/authorsRoutes.js';
import careerRouter from './routes/careerRoutes.js';
import coursesRouter from './routes/coursesRoutes.js';
import emailRouter from './routes/emailRoutes.js';
import companiesRouter from './routes/companiesRoutes.js';
import professionalStatusRouter from './routes/professionalStatusRoutes.js';
import path from "node:path";
import { fileURLToPath } from "node:url";
import cookieParser from "cookie-parser";
import cors from "cors";
import expressFileUpload from "express-fileupload";
//import nodemailer from "nodemailer";


const server = express();
const port = process.env.PORT || 4000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

server.use(express.json(), cookieParser());
server.use(
  cors({
    origin: "http://localhost:3000", // Der Create React App Port
    credentials: true, // Cookies zulassen
  })
);
server.use(express.static("public"));
server.use(expressFileUpload({createParentPath: true,}));

server.use("/home", indexRouter)
server.use("/user", userRouter);
server.use("/contacts",  contactsRouter)
server.use("/authors",  authorsRouter)
server.use("/careers",  careerRouter)
server.use("/professionalStatus", professionalStatusRouter)
server.use("/companies",  companiesRouter)
server.use("/courses", coursesRouter)
server.use("/email", emailRouter)
server.use("/", indexRouter)
server.use(unkownHandler)
server.use(errorHandler) 


if(await connectMongoose() ) {
   server.listen(port, ()=> {
     console.log("listening to port ", port);
   })
 }
 
//export default server



