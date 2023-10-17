import ContactModel from '../models/contactModel.js'

export const getAllContacts = async (req, res) => {
    try {
    const contact = await ContactModel.find()
      .populate("professionalStatus")
      .populate("careerPath")
      .populate("authorsData")
      .populate("companyData");
        res.status(200).json(contact)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getContact = async (req, res) => {

    const contactId = req.params.id;
    try {
      const contact = await ContactModel
        .findById(contactId);
  
      const contactPopulated = await ContactModel
        .findById(contactId)
        /* .populate("professionalStatus")
        .populate("careerPath")
        .populate("authorsData")
        .populate("companyData")
        .populate("career"); */
        .populate([
          "careerPath",
          "professionalStatus",
          "authorsData",
          "currentCompany",
          "career"
        ])

      console.log("contact.userName", contact.userName); 
    // hier kann ich auf das virtuelle Feld "firstName" zugreifen
    // obwohl dieses nicht in der Datenbank exisitert 
    // (deswegen bezeichnet man es als virtuell)
      
      console.log("contact", contact); 
      // hier wird das virtuelle Feld nicht angezeigt,
      // da ich es nicht explizit mit dem . Operator auswähle
  
      res.json(contactPopulated);   
     
    } catch (error) {
      res.send(error.message)
    }
  
  }


export const addContact = async (req, res) => {
    try {
    const newContact = await ContactModel.create(req.body)
    //const person = await PersonModel.find()
    //res.status(200).json(newPerson)
    res.send(`User created and saved. ID:${newContact._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateContact = async (req, res) => {

    const contactId = req.params.id;
    try {
        const contact = await ContactModel.findOneAndUpdate(contactId, req.body);
  
      res.json(contact)
    } catch (error) {
      res.send(error.message)
    }
  
  }

  export const getAuthorsInfo = async (req, res) => {

    const contactId = req.params.id;
    try {
      const contact = await ContactModel
        .findById(contactId);
  
      const contactPopulated = await ContactModel
        .findById(contactId)
        .populate("authorsData");

      console.log("contact.userName", contact.userName); 
    // hier kann ich auf das virtuelle Feld "firstName" zugreifen
    // obwohl dieses nicht in der Datenbank exisitert 
    // (deswegen bezeichnet man es als virtuell)
      
      console.log("contact", contact); 
      // hier wird das virtuelle Feld nicht angezeigt,
      // da ich es nicht explizit mit dem . Operator auswähle
  
      res.json(contactPopulated);   
     
    } catch (error) {
      res.send(error.message)
    }
  
  }

