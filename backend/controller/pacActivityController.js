import pacModel from '../models/pacModel.js'

export const getAllPACActivities = async (req, res) => {
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

export const getPACActivity = async (req, res) => {

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

export const getFilteredPACActivityList = async (req, res) => {
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
 
export const addPACActivity = async (req, res) => {
  //console.log(req)
    try {
    const newPACActivity = await pacModel.create(
      req.body
    )
      //console.log(newCourse)
    
    res.json(newPACActivity/* `Course has been created and saved. mit der ID:${newCourse._id}` */)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updatePACActivity = async (req, res) => {
  const courseId = req.body.courseId;
  try {
    const updatedCourse = req.body;
    const course = await CourseModel.findByIdAndUpdate(courseId, updatedCourse, { new: true });
    res.json(course);
  } catch (error) {
      res.send(error.message);
  }
}

export const deletePACActivity = async (req, res) => {

  try {
    const deleteCourse = await CourseModel.deleteOne({_id: req.params.id});
    res.status(202).send({ message: "Kurs erfolgreich gelöscht" });
  } catch (error) {
    res.status(404).send({ message: "Fehler, der Kurs konnte nicht gelöscht werden"});
  }
};


