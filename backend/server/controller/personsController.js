import PersonModel from '../models/personModel.js'

export const getAllPersons = async (req, res) => {
    try {
    const person = await PersonModel.find()
      .populate("knowledgeData");
        res.status(200).json(person)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getPerson = async (req, res) => {

    const personId = req.params.id;
    try {
      const person = await PersonModel
        .findById(personId);
  
      const personPopulated = await PersonModel
        .findById(personId)
        .populate("knowledgeData");

      console.log("person.userName", person.userName); 
    // hier kann ich auf das virtuelle Feld "firstName" zugreifen
    // obwohl dieses nicht in der Datenbank exisitert 
    // (deswegen bezeichnet man es als virtuell)
      
      console.log("person", person); 
      // hier wird das virtuelle Feld nicht angezeigt,
      // da ich es nicht explizit mit dem . Operator auswähle
  
      res.json(personPopulated);   
     
    } catch (error) {
      res.send(error.message)
    }
  
  }


export const registerPerson = async (req, res) => {
    try {
    const newPerson = await PersonModel.create(req.body)
    //const person = await PersonModel.find()
    //res.status(200).json(newPerson)
    res.send(`User created and saved. ID:${newPerson._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updatePerson = async (req, res) => {

    const personId = req.params.id;
    try {
        const person = await PersonModel.findOneAndUpdate(personId, req.body);
  
      res.json(person)
    } catch (error) {
      res.send(error.message)
    }
  
  }

