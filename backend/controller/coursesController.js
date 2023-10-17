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

  /* export const getFilteredCourselist = async (req, res) => {
    console.log(req.query)
    const { autor, themenfeld, kursart, kursstart, level } = req.query;
    //const topicField = query.themenfeld;
    //const courseType = req.query.kursart;
    //const professionalLevel = req.query.level;
    //const topicField = "Lichttechnik";
    console.log(topicField)
    try {
      const filteredCourselist = await CourseModel
        .find({
          topicField: themenfeld, 
          courseType: kursart,
        })
        .populate("author")  

      res.json(filteredCourselist);   
     
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  
  } */

  export const getFilteredCourselist = async (req, res) => {
    console.log(req.query);
    
    try {
      const { autor, themenfeld, kursart, kursstart, level, sprache } = req.query;
            
      let query = {}; // Create an empty query
      // Check if filter query parameters are present, and add them to the query if they exist
      
      /* if (autor !=="") {
        query.autor = autor;
      } */
      /* if (themenfeld !=="") {
        query.topicField = themenfeld;
      } 
      if (kursart !=="") {
        query.courseType = kursart;
      }
      if (level !=="") {
        query.professionalLevel = level;
      }
      if (sprache !=="") {
        query.courseLanguage = sprache;
      }*/
      autor !== "" && (query.autor = autor)
      themenfeld !== "" && (query.topicField = themenfeld);
      kursart !== "" && (query.courseType = kursart);
      level !== "" && (query.professionalLevel = level)
      sprache !== "" && (query.courseLanguage = sprache)
      if (Object.keys(query).length === 0) {
        // Wenn alle Filter auf null gesetzt werden, wird die query auf leer gesetzt
        query = {};
      }
      console.log(query)
      
      const filteredCourselist = await CourseModel
        .find( query )
        .populate("author");
  
      res.json(filteredCourselist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


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

