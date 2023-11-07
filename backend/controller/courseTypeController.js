import CourseTypeModel from '../models/courseTypeModel.js'

export const getAllCourseTypes = async (req, res) => {
    try {
    const course = await CourseTypeModel.find()
        res.status(200).json(course)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getCourseType = async (req, res) => {

    const courseTypeId = req.params.id;
    try {
      const courseType = await CourseModel
      .findById(courseTypeId);
      res.json(courseType);    
    } catch (error) {
      res.send(error.message)
    }
  }

export const addCourseType = async (req, res) => {
  console.log(req)
    try {
    const newCourseType = await CourseTypeModel.create({
      type: req.body.type
    })
      console.log(newCourseType)
    //const person = await PersonModel.find()
    //res.status(200).json(newPerson)
    res.send(`Der Kurstyp wurde angelegt und gesichert mit der ID:${newCourseType._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateCourseType = async (req, res) => {
  console.log(req.body)
  const courseTypeId = req.body.courseTypeId;
  try {
    const updatedCourseType = {
      type: req.body.type
    };

    const courseType = await CourseTypeModel.findByIdAndUpdate(courseTypeId, updatedCourseType, { new: true });
    res.json(courseType);
  } catch (error) {
      res.send(error.message);
  }
}

export const deleteCourseType = async (req, res) => {
  try {
    const deleteCourseType = await CourseTypeModel.deleteOne({_id: req.params.id});
    res.status(202).send({ message: "Kurstyp erfolgreich gelöscht" });
  } catch (error) {
    res.status(404).send({message: "Fehler, der Kurstyp konnte nicht gelöscht werden"});
  }
};


