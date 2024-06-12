import express, { Router } from "express"
import { getAllCPDTracks, addCPDTrack, updateCPDTrack, getCPDTracksOfContact, getCPDTrack} from '../controller/cpdTrackerController.js'


const router = Router()
router
.get("/list", getAllCPDTracks )
.get("/", getAllCPDTracks )
.post("/addcpdtrack", addCPDTrack )
.patch("/:id", updateCPDTrack)
.get("/contact/:contact", getCPDTracksOfContact)
.get("/:id", getCPDTrack);

export default router
