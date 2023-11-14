import CourseModel from '../models/courseModel.js'

export const getAllCourses = async (req, res) => {
    try {
    const course = await CourseModel.find()
      //.populate("author");
      .populate(["updatedBy",
        {path:"author",
          populate: [
            "authorsData"
          ]
        }]);
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
        .populate("updatedBy")
        .populate({
          path:"author",
          populate: {
            path: "authorsData"}
        });
  
      /* const coursePopulated = await CourseModel
        .findById(courseId)
        .populate(["author","updatedBy"]) */

      //console.log("course.topic", course.topic); 
    // hier kann ich auf das virtuelle Feld "firstName" zugreifen
    // obwohl dieses nicht in der Datenbank exisitert 
    // (deswegen bezeichnet man es als virtuell)
      
      //console.log("course", course); 
      // hier wird das virtuelle Feld nicht angezeigt,
      // da ich es nicht explizit mit dem . Operator auswähle
  
      res.json(course);    
    } catch (error) {
      res.send(error.message)
    }
  }

  
export const getFilteredCourselist = async (req, res) => {
  console.log(req.query);
  
  try {
    const { autor, themenfeld, kursart, kursstart, kursende, level, sprache, sortierung, active } = req.query;
          
    let query = { active: 'true' };
    let sortItem = "Kursstart";
    
    // Hier wird das aktuelle Datum erstellt
    const currentDate = new Date();
    
    autor !== "" && (query.autor = autor)
    themenfeld !== "" && (query.topicField = themenfeld);
    kursart !== "" && (query.courseType = kursart);
    level !== "" && (query.professionalLevel = level);
    sprache !== "" && (query.courseLanguage = sprache);
    
    if (sortierung === "Kursstart") {
      sortItem = "startDateOfCourse";
    }
    if (sortierung === "Level") {
      sortItem = "professionalLevel";
    }
    
    if (Object.keys(query).length === 0) {
      query = { active: 'true' };
    }
    
    // Hier wird der Filter für das Enddatum (endDateOfCourse) hinzugefügt
    query.endDateOfCourse = { $gt: currentDate };
    //query.startDateOfCourse = { $gt: currentDate };

    console.log(query);
    
    const filteredCourselist = await CourseModel
      .find(query)
      .sort({ [sortItem]: 1 })
      .populate(["author", "updatedBy"]);
  
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
      cpdBasicPoints: req.body.cpdBasicPoints,
      cpdAdditionalPoints: req.body.cpdAdditionalPoints,
      startDateOfCourse: req.body.startDateOfCourse,
      endDateOfCourse: req.body.endDateOfCourse, 
      linkToProvider: req.body.provider,
      active: req.body.active,
      updatedBy: req.body.updatedBy,
    })
      console.log(newCourse)
    //const person = await PersonModel.find()
    //res.status(200).json(newPerson)
    res.send(`Course has been created and saved. mit der ID:${newCourse._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateCourse = async (req, res) => {
  console.log(req.body)
  const courseId = req.body.courseId;
  try {
    const updatedCourse = {
      courseTopic: req.body.courseTopic,
      author: req.body.author,
      topicField: req.body.topicField,
      courseType: req.body.courseType,
      courseContent: req.body.courseContent,
      courseLanguage: req.body.courseLanguage,
      professionalLevel: req.body.professionalLevel,
      cpdBasicPoints: req.body.cpdBasicPoints,
      cpdAdditionalPoints: req.body.cpdAdditionalPoints,
      startDateOfCourse: req.body.startDateOfCourse,
      endDateOfCourse: req.body.endDateOfCourse,
      linkToProvider: req.body.provider,
      active: req.body.active,
      updatedBy: req.body.updatedBy,
    };

    const course = await CourseModel.findByIdAndUpdate(courseId, updatedCourse, { new: true });
    res.json(course);
  } catch (error) {
      res.send(error.message);
  }
}

export const deleteCourse = async (req, res) => {

  try {
    const deleteCourse = await CourseModel.deleteOne({_id: req.params.id});
    res.status(202).send({ message: "Kurs erfolgreich gelöscht" });
  } catch (error) {
    res.status(404).send({message: "Fehler, der Kurs konnte nicht gelöscht werden"});
  }
};


