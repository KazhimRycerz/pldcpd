import KnowledgeModel from '../models/knowledgeModel.js'

export const getMaKnowledgeData = async (req, res) => {
    try {
    const maKnowledgeStatus = await KnowledgeModel.find()
      //.populate("NNData");
        res.status(200).json(maKnowledgeStatus)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getMyKnowledgeData = async (req, res) => {

    const myKDId = req.params.id;
    try {
      const myKFData = await KnowledgeModel
        .findById(myKDId);
  
       /*const myKFIdPopulated = await KnowledgeModel
        .findById(myKDId)
        .populate("NNData"); */

      console.log("myKFData.myKF", myKFData.myKF); 
          
      //console.log("myKFData", myKFData); 
      // hier wird das virtuelle Feld nicht angezeigt,
      // da ich es nicht explizit mit dem . Operator auswähle
  
      res.json(myKFData);   
     
    } catch (error) {
      res.send(error.message)
    }
  
  }
//// Hier bitte weiterarbeiten

export const addMyKnowledgeData = async (req, res) => {
    try {
    const newKData = await KnowledgeModel.create(req.body)
    res.send(`Data created and saved. ID:${newKData._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateMyKnowledgeData = async (req, res) => {

    const DataId = req.params.id;
    try {
        const myKData = await KnowledgeModel.findOneAndUpdate(DataId, req.body);
  
      res.json(myKData)
    } catch (error) {
      res.send(error.message)
    }
  
  }

