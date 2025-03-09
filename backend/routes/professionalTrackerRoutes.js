import express, { Router } from "express"
import { getAllProfessionalTracks, addProfessionalTrack, updateProfessionalTrack, getProfessionalTracksOfContact, getProfessionalTrack} from '../controller/professionalTrackerController.js'


const router = Router()
router
.get("/list", getAllProfessionalTracks )
.get("/", getAllProfessionalTracks )
.post("/", addProfessionalTrack )
.patch("/:id", updateProfessionalTrack)
.get("/contact/:contact", getProfessionalTracksOfContact)
.get("/:id", getProfessionalTrack);

export default router
