import express from "express";
import ContactModel from "../models/contactModel.js";
import UserModel from "../models/userModel.js";
import ProfessionalStatusModel from "../models/professionalStatusModel.js";


/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

 export const addContactData = async (userData) => {
   try {
     /* const newContact = new ContactModel({
       firstName: userData.firstName,
       lastName: userData.lastName,
       eMail: userData.eMail
      }); 
      await newContact.save(); */
      console.log(userData)
    const newContact = await ContactModel.create({
      firstName: userData.firstName,
      lastName: userData.lastName
    });

    console.log(/* userData._id, */ newContact)

    const userId = userData._id
    const user = await UserModel
    .findOneAndUpdate(
      {_id:userId},
      {$set:{contactData: newContact._id}} 
      )
      /* console.log(newContact._id)
      console.log(user) */
    return ({ msg: "Ihr Kontaktdatensatz wurde eingerichtet", newContact});
  } catch (error) {
    return (error.message);
  }
};

export const addProfessionalStatus = async (contactID) => {
  try {
    /* const newContact = new ContactModel({
      firstName: userData.firstName,
      lastName: userData.lastName,
      eMail: userData.eMail
     }); 
     await newContact.save(); */
     console.log(contactID)
   const newProfessionalStatus = await ProfessionalStatusModel.create();

   const contactId = contactID
   const contact = await ContactModel
   .findOneAndUpdate(
     {_id:contactId},
     {$set:{professionalStatus: newProfessionalStatus._id}} 
     )
     /* console.log(newContact._id)
     console.log(user) */
   return ({ msg: "Ihr professioneller Status wurde eingerichtet", newProfessionalStatus});
 } catch (error) {
   return (error.message);
 }
};