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
        .populate(["author","updatedBy"])
  
      const coursePopulated = await CourseModel
        .findById(courseId)
        .populate(["author","updatedBy"])

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

  export const getFilteredCourselist = async (req, res) => {
    console.log(req.query);
    
    try {
      const { autor, themenfeld, kursart, kursstart, level, sprache, sortierung } = req.query;
            
      let query = {}; // Create an empty query
      let sortItem = "Kursstart"; //
      // Check if filter query parameters are present, and add them to the query if they exist
      
      autor !== "" && (query.courseTopic = autor)
      themenfeld !== "" && (query.topicField = themenfeld);
      kursart !== "" && (query.courseType = kursart);
      level !== "" && (query.professionalLevel = level)
      sprache !== "" && (query.courseLanguage = sprache)
      if (sortierung == "Kursstart") {sortItem = "startDateOfCourse"}
      if (sortierung == "Level") {sortItem = "professionalLevel"}
      if (Object.keys(query).length === 0) {
        // Wenn alle Filter auf null gesetzt werden, wird die query auf leer gesetzt
        query = {};
      }
      console.log(query)
      
      const filteredCourselist = await CourseModel
        .find( query )
        .sort({ [sortItem]: 1 })
        /* .populate("author"); */
        .populate(["author","updatedBy"]);
  
      res.json(filteredCourselist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  


export const addCourse = async (req, res) => {
  console.log(req)
    try {
    const newCourse = await CourseModel.create({
      courseTopic: req.body.courseTopic,
      author: req.body.author,
      topicField: req.body.topicField,
      courseType: req.body.courseType,
      courseContent: req.body.courseContent,
      courseLanguage: req.body.courseLanguage,
      professionalLevel: req.body.professionalLevel,
      author: req.body.author,
      //cpdBasicPoints: req.body.cpdBasicPoints,
      //cpdAdditionalPoints: req.body.cpdAdditionalPoints,
      updatedBy: req.body.updatedBy,
    }
      )
    //const person = await PersonModel.find()
    //res.status(200).json(newPerson)
    res.send(`Course has been created and saved. mit der ID:${newCourse._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateCourse = async (req, res) => {
  const courseId = req.params.id;
  try {
      const course = await CourseModel.findByIdAndUpdate(courseId, req.body, { new: true });
      res.json(course);
  } catch (error) {
      res.send(error.message);
  }
}


