import express from "express";
import ContactModel from "../models/contactModel.js";
import ProfessionalStatusModel from "../models/professionalStatusModel.js";


/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

export const addCPDTrackToContact = async (cpdData) => {
  try {
   const contactId = cpdData.contact; // ID des Kontakts
   const courseId = cpdData._id; // Neue Kurs-ID

   // Füge die Kurs-ID zum Array "cpdTracker" hinzu
   const updatedContact = await ContactModel.findOneAndUpdate(
     { _id: contactId },
     { $push: { cpdTracker: courseId } }, // Verwende $push, um den Kurs hinzuzufügen
     { new: true } // Gibt das aktualisierte Dokument zurück
   );

   if (!updatedContact) {
     return { msg: "Kontakt nicht gefunden" };
   }

   return { msg: "Ihr Kontaktdatensatz wurde aktualisiert", updatedContact };
 } catch (error) {
   return { error: error.message };
 }
};

export const addProfessionalActivityToContact = async (professionalData) => {
  try {
   const contactId = professionalData.contact; // ID des Kontakts
   const activityId = professionalData._id; // Neue Kurs-ID

   // Füge die Kurs-ID zum Array "cpdTracker" hinzu
   const updatedContact = await ContactModel.findOneAndUpdate(
     { _id: contactId },
     { $push: { professionalTracker: activityId } }, // Verwende $push, um den Kurs hinzuzufügen
     { new: true } // Gibt das aktualisierte Dokument zurück
   );

   if (!updatedContact) {
     return { msg: "Kontakt nicht gefunden" };
   }

   return { msg: "Ihr Kontaktdatensatz wurde aktualisiert", updatedContact };
 } catch (error) {
   return { error: error.message };
 }
};


