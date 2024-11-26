import CPDTrackerModel from '../models/cpdTrackerModel.js';
import ContactModel from '../models/contactModel.js';
import CourseModel from '../models/courseModel.js';
import { addCPDTrackToUser } from '../middleware/addToUserData.js';
import { addCPDTrackToContact } from '../middleware/addToContactData.js';

export const getAllCPDTracks = async (req, res) => {
    try {
    const cpdTracks = await CPDTrackerModel
      .find()
      .populate("courseId")
      .populate("contact");
        res.status(200).json(cpdTracks)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getCPDTracksOfContact = async (req, res) => {
    const cpdTrackerContact = req.params.contact;
    try {
      const cpdTracks = await CPDTrackerModel
        .find({contact: cpdTracks/* , active: false */})
        .populate("courseId");

      //console.log("career.company", career); 
  
      res.json(cpdTracks);   
     
    } catch (error) {
      res.send(error.message)
    }
  }

  export const getCPDTrack = async (req, res) => {
      const cpdTrackId = req.params.id;
      try {
        const cpdTrack = await CPDTrackerModel
          .findById(cpdTrackId)
          .populate("contact")
          .populate("courseId");
  
        //console.log("career.company", career); 
    
        res.json(cpdTrack);   
       
      } catch (error) {
        res.send(error.message)
      }
    }  

  export const addCPDTrack = async (req, res) => {
    //console.log(req.body.userId, req.body.courseId, req.body.contact)
      try {
        const newTrack ={
          contact: req.body.contact,
          courseId: req.body.courseId,
          activityType: "LEO",
          active: false
        }

      const addedCPDTrack = await CPDTrackerModel.create(newTrack)
      req.addedCPDTrack = addedCPDTrack;

      console.log(addedCPDTrack)
      //addCPDTrackToUser(addedCPDTrack)
      addCPDTrackToContact(addedCPDTrack)

      res.send(`this course has been added to the list:${addedCPDTrack.contact}`)
      } catch (error) {
          console.log(error)
          res.status(409).send(error.message)
      }
  }

  export const updateCPDTrack = async (req, res) => {

    const CPDTrackId = req.params.id;
    try {
      const cpdTrack = await CPDTrackerModel.findOneAndUpdate(CPDTrackId, req.body);
      res.json(cpdTrack)
    } catch (error) {
      res.send(error.message)
    }
  
  }

