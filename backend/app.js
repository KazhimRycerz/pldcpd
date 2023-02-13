import express from 'express';
import connectMongoose from "./util/connectMogoose.js";
import  { unkownHandler, errorHandler } from './middleware/middelware.js'
import indexRouter from './routes/indexRouter.js'
import contactsRouter from './routes/contactsRouter.js'
import knowledgeRouter from './routes/knowledgeRouter.js'
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import expressFileUpload from "express-fileupload";


const port = process.env.PORT || 3000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json())
app.use(express.static("public"));
app.use(expressFileUpload({createParentPath: true,}));

app.use("/knowledgeAccount", knowledgeRouter)
app.use("/contacts",  contactsRouter)
app.use("/home", indexRouter)
app.use("/", indexRouter)
app.use(unkownHandler)
app.use(errorHandler) 


if(await connectMongoose() ) {
   app.listen(port, ()=> {
     console.log("listening to port ", port);
   })
 }
 
export default app



