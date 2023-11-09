import AccessRightsModel from '../models/accessRightsModel.js'

export const getAllAccessRights = async (req, res) => {
    try {
    const accessRights = await AccessRightsModel.find()
        res.status(200).json(accessRights)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getAccessRight = async (req, res) => {

    const accessRightId = req.params.id;
    try {
      const accessRight = await AccessRightsModel
      .findById(accessRightId);
      res.json(accessRight);    
    } catch (error) {
      res.send(error.message)
    }
  }

export const addAccessRight = async (req, res) => {
  console.log(req)
    try {
    const newAccessRight = await AccessRightsModel.create({
      level: req.body.level,
      description: req.body.description,
      active: req.body.active,
    })
      console.log(newAccessRight)
    //res.status(200).json(newAccessRight)
    res.send(`Das neue Zugangsrecht wurde angelegt:${newAccessRight._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateAccessRight = async (req, res) => {
  console.log(req.body)
  const accessRightId = req.body.accessRightId;
  try {
    const updatedAccessRight = {
      level: req.body.level,
      description: req.body.description,
      active: req.body.active,
    };

    const accessRight = await AccessRightsModel.findByIdAndUpdate(accessRightId, updatedAccessRight, { new: true });
    res.json(accessRight);
  } catch (error) {
      res.send(error.message);
  }
}

export const deleteAccessRight = async (req, res) => {
  try {
    const deleteAccessRight = await AccessRightsModel.deleteOne({_id: req.params.id});
    res.status(202).send({ message: "Zugangsrechte wurden erfolgreich gelöscht" });
  } catch (error) {
    res.status(404).send({message: "Fehler, das Recht konnte nicht gelöscht werden"});
  }
};


