import CareerModel from '../models/careerModel.js'
import CompanyModel from '../models/companyModel.js';
import ContactModel from '../models/contactModel.js';

export const getAllCareers = async (req, res) => {
    try {
    const career = await CareerModel
      .find()
      /* .populate("contact") */
      .populate("company");
        res.status(200).json(career)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getCareerOfContact = async (req, res) => {
    const careerContact = req.params.contact;
    try {
      const career = await CareerModel
        .find({contact: careerContact/* , active: false */})
        .populate("company")
        .populate("contact");

      //console.log("career.company", career); 
  
      res.json(career);   
     
    } catch (error) {
      res.send(error.message)
    }
  }

  export const getCareer = async (req, res) => {
      const careerId = req.params.id;
      try {
        const career = await CareerModel
          .findById(careerId)
          .populate("contact")
          .populate("company");
  
        //console.log("career.company", career); 
    
        res.json(career);   
       
      } catch (error) {
        res.send(error.message)
      }
    }  


export const addCareer = async (req, res) => {
    try {
    const addCareerStep = await CareerModel.create(req.body)
    res.send(`this career-step has been added:${career._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateCareer = async (req, res) => {

    const careerId = req.params.id;
    try {
      const career = await CareerModel.findOneAndUpdate(careerId, req.body);
      res.json(career)
    } catch (error) {
      res.send(error.message)
    }
  
  }

