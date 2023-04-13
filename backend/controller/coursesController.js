import CourseModel from '../models/courseModel.js'

export const getAllCourses = async (req, res) => {
    try {
    const course = await CourseModel.find()
      .populate("author");
        res.status(200).json(course)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getCourse = async (req, res) => {

    const courseId = req.params.id;
    try {
      const course = await CourseModel
        .findById(courseId)
        .populate("author")
  
      const coursePopulated = await CourseModel
        .findById(courseId)
        .populate("author")

      //console.log("course.topic", course.topic); 
    // hier kann ich auf das virtuelle Feld "firstName" zugreifen
    // obwohl dieses nicht in der Datenbank exisitert 
    // (deswegen bezeichnet man es als virtuell)
      
      //console.log("course", course); 
      // hier wird das virtuelle Feld nicht angezeigt,
      // da ich es nicht explizit mit dem . Operator auswähle
  
      res.json(coursePopulated);   
     
    } catch (error) {
      res.send(error.message)
    }
  
  }


export const addCourse = async (req, res) => {
    try {
    const newCourse = await CourseModel.create(req.body)
    //const person = await PersonModel.find()
    //res.status(200).json(newPerson)
    res.send(`Course has been created and saved. ID:${newCourse._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateCourse = async (req, res) => {

    const courseId = req.params.id;
    try {
        const course = await CourseModel.findOneAndUpdate(courseId, req.body);
  
      res.json(course)
    } catch (error) {
      res.send(error.message)
    }
  
  }

