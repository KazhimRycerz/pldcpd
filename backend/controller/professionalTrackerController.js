import professionalTrackerModel from '../models/professionalTrackerModel.js';
import ContactModel from '../models/contactModel.js';
import CourseModel from '../models/courseModel.js';
import pacModel from '../models/pacModel.js';
//import { addProfessionalTrackToUser } from '../middleware/addToUserData.js';
//import { addProfessionalTrackToContact } from '../middleware/addToContactData.js';

export const getAllProfessionalTracks = async (req, res) => {
    try {
    const professionalTracks = await professionalTrackerModel
      .find()
      .populate("courseId")
      .populate("contact");
        res.status(200).json(professionalTracks)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getProfessionalTracksOfContact = async (req, res) => {
    const professionalTrackerContact = req.params.contact;
    try {
      const professionalTracks = await professionalTrackerModel
        .find({contact: professionalTracks/* , active: false */})
        .populate("courseId");

      //console.log("career.company", career); 
  
      res.json(professionalTracks);   
     
    } catch (error) {
      res.send(error.message)
    }
  }

  export const getProfessionalTrack = async (req, res) => {
      const professionalTrackId = req.params.id;
      try {
        const professionalTrack = await professionalTrackerModel
          .findById(professionalTrackId)
          .populate("contact")
          .populate("courseId");
  
        //console.log("career.company", career); 
    
        res.json(professionalTrack);   
       
      } catch (error) {
        res.send(error.message)
      }
    }  

  export const addProfessionalTrack = async (req, res) => {
    //console.log(req.body.userId, req.body.courseId, req.body.contact)
      try {
        const newTrack ={
          contact: req.body.contact,
          courseId: req.body.courseId,
          activityType: "PAC",
          active: false
        }

      const addedProfessionalTrack = await professionalTrackerModel.create(newTrack)
      req.addedProfessionalTrack = addedProfessionalTrack;

      console.log(addedProfessionalTrack)
      //addProfessionalTrackToContact(addedProfessionalTrack)

      res.send(`this course has been added to the list:${addedProfessionalTrack.contact}`)
      } catch (error) {
          console.log(error)
          res.status(409).send(error.message)
      }
  }

  export const updateProfessionalTrack = async (req, res) => {

    const professionalTrackId = req.params.id;
    try {
      const professionalTrack = await professionalTrackerModel.findOneAndUpdate(professionalTrackId, req.body);
      res.json(professionalTrack)
    } catch (error) {
      res.send(error.message)
    }
  
  }

