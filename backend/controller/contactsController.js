import ContactModel from '../models/contactModel.js'

export const getAllContacts = async (req, res) => {
    try {
    const contact = await ContactModel.find()
    .populate([
      {
        path: "careerPath",
        populate: {
          path: "company",
        }
      },
      {
        path: "currentCompany",
        populate: {
          path: "company",
        }
      },
      {
        path: "cpdTracker",
        populate: {
          path: "courseId",
        }
      },
      {
        path: "professionalTracker",
        populate: {
          path: "activityId"
        }
      },
      "updatedBy",
      "professionalStatus",
      "authorsData",
      "currentCompany"
    ])
      //.populate("companyData");
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
      .findById(contactId)
      .populate([
        {
          path: "careerPath",
          populate: {
            path: "company",
          }
        },
        {
          path: "cpdTracker",
          populate: {
            path: "courseId",
          }
        },
        {
          path: "professionalTracker",
          populate: {
            path: "activityId"
          }
        },
        "updatedBy",
        "professionalStatus",
        "authorsData",
        "currentCompany"
        
      ]);
      
    //console.log("Firma", currentCompany); 
    // hier kann ich auf das virtuelle Feld "firstName" zugreifen
    // obwohl dieses nicht in der Datenbank exisitert 
    // (deswegen bezeichnet man es als virtuell)
      
      //console.log("contact", contact); 
      // hier wird das virtuelle Feld nicht angezeigt,
      // da ich es nicht explizit mit dem . Operator auswähle
  
      // Falls kein Kontakt gefunden wurde
      if (!contact) {
         return res.status(404).json({ message: "Contact not found" });
      }

      // Rückgabe des gefundenen Kontakts
      res.status(200).json(contact);
   } catch (error) {
      console.error("Error fetching contact:", error.message);

      // Fehlerbehandlung
      res.status(500).json({
         message: "An error occurred while fetching the contact",
         error: error.message, // Entferne error.message, falls du keine sensiblen Infos preisgeben möchtest
      });
   }
};


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
        const contact = await ContactModel.findOneAndUpdate({_id: contactId}, req.body);
  
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

    const authorsData = await ContactModel
      .findById(contactId)
      .populate("authorsData");

    console.log("contact.userName", contact.userName); 
  // hier kann ich auf das virtuelle Feld "firstName" zugreifen
  // obwohl dieses nicht in der Datenbank exisitert 
  // (deswegen bezeichnet man es als virtuell)
    
    console.log("contact", contact); 
    // hier wird das virtuelle Feld nicht angezeigt,
    // da ich es nicht explizit mit dem . Operator auswähle

    res.json(authorsData);   
    
  } catch (error) {
    res.send(error.message)
  }

}


export const getAllAuthorsInfo = async (req, res) => {
  try {
    // Suche nach Dokumenten, bei denen `authorsData` existiert und mindestens eine ObjectId enthält
    const authorsList = await ContactModel.find({
      authorsData: { $exists: true, $type: 'objectId' } 
    });
console.log(authorsList)
    res.status(200).json(authorsList);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

