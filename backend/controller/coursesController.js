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
  
      res.json(course);    
    } catch (error) {
      res.send(error.message)
    }
  }

  
  export const getFilteredCourselist = async (req, res) => {
    try {
      const { autor, themenfeld, kursart, kursstart, kursende, level, sprache, sortierung, active, bookingNo } = req.query;
      
      let query = { active: 'true' };
      let sortItem = "startDateOfCourse"; // Standard-Sortierfeld
      let sortDirection = 1; // Standard: aufsteigend sortieren
      
      // Aktuelles Datum
      const currentDate = new Date();
      
      // Filterbedingungen
      if (autor) query.author = { $in: [autor] };
      if (themenfeld) query.topicField = themenfeld;
      if (kursart) query.courseType = kursart;
      if (level) query.professionalLevel = { $lte: level }; // Filter nach Level: maximaler Level
      if (sprache) query.courseLanguage = sprache;
      // Enddatum-Filter
      query.endDateOfCourse = { $gt: currentDate };

      // Sortierung
      if (sortierung === "Kursstart") {
        sortItem = "startDateOfCourse";
        sortDirection = 1; // Aufsteigende Sortierung
      } else if (sortierung === "Level9_0") {
        sortItem = "professionalLevel";
        sortDirection = -1; // Absteigende Sortierung
      } else if (sortierung === "Level0_9") {
        sortItem = "professionalLevel";
        sortDirection = 1; // Absteigende Sortierung
      }
      
      // Abfrage mit Sortierung und Population
      const filteredCourselist = await CourseModel
        .find(query)
        .sort({ [sortItem]: sortDirection })
        .populate(["author", "updatedBy"]);
  
      // Antwort senden
      res.json(filteredCourselist);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  


export const addCourse = async (req, res) => {
  //console.log(req)
    try {
    const newCourse = await CourseModel.create(
      req.body
      /* courseTopic: req.body.courseTopic,
      author: req.body.author,
      bookingNo: req.body.bookingNo,
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
      updatedBy: req.body.updatedBy, */
    )
      //console.log(newCourse)
    
    res.json(newCourse/* `Course has been created and saved. mit der ID:${newCourse._id}` */)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateCourse = async (req, res) => {
  const courseId = req.body.courseId;
  try {
    const updatedCourse = req.body;
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
    res.status(404).send({ message: "Fehler, der Kurs konnte nicht gelöscht werden"});
  }
};


