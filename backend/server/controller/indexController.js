import { Router } from 'express';

const router = Router()

const getHome = (req, res) => {
    res.send(`This is the home-page for mongoos " database...Vielen Dank, dass Sie 'sich für unsere DB interessieren.`);
  };


export default getHome
