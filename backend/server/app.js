import express from 'express';
import connectMongoose from "./util/connectMogoose.js";
import  { unkownHandler, errorHandler } from './middleware/middelware.js'
import indexRouter from './routes/indexRouter.js'
import personsRouter from './routes/personRouter.js'
import knowledgeRouter from './routes/knowledgeRouter.js'


const app = express();
const port = process.env.PORT || 3000;
app.use(express.json())

app.use("/knowledgeAccount", knowledgeRouter)
app.use("/persons",  personsRouter)
app.use(indexRouter)
app.use(unkownHandler)
app.use(errorHandler) 


if(await connectMongoose() ) {
   app.listen(port, ()=> {
     console.log("listening to port ", port);
   })
 }
 

//export default app



