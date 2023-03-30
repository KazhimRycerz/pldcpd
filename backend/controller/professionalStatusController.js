import ProfessionalStatusModel from '../models/professionalStatusModel.js'
import levelChecker from '../middleware/levelManager.js'

export const getMaKnowledgeData = async (req, res) => {
    try {
    const maKnowledgeStatus = await ProfessionalStatusModel.find()
      //.populate("NNData");
      const maKFArray = [];
        for (let i=0; i < maKnowledgeStatus.length; i++) {
          maKFArray.push(maKnowledgeStatus[i].myKF)
        }
      const maKFAverage = maKFArray.reduce((acc, val) => acc+val,0)/maKnowledgeStatus.length;
      const maKF = Number(maKFAverage.toFixed(0))

      const maLFArray = [];
        for (let i=0; i < maKnowledgeStatus.length; i++) {
          maLFArray.push(maKnowledgeStatus[i].myLF)
        }
      const maLFAverage = maLFArray.reduce((acc, val) => acc+val,0)/maKnowledgeStatus.length;
      const maLF = Number(maLFAverage.toFixed(0))

      const maPEDhArray = [];
        for (let i=0; i < maKnowledgeStatus.length; i++) {
          maPEDhArray.push(maKnowledgeStatus[i].myPEDh)
        }
      const maPEDhAverage = maPEDhArray.reduce((acc, val) => acc+val,0)/maKnowledgeStatus.length;
      const maPEDh = Number(maPEDhAverage.toFixed(0))

      const maPEXhArray = [];
        for (let i=0; i < maKnowledgeStatus.length; i++) {
          maPEXhArray.push(maKnowledgeStatus[i].myPEXh)
        }
      const maPEXhAverage = maPEXhArray.reduce((acc, val) => acc+val,0)/maKnowledgeStatus.length;
      const maPEXh = Number(maPEXhAverage.toFixed(0))

      const maPAArray = [];
        for (let i=0; i < maKnowledgeStatus.length; i++) {
          maPAArray.push(maKnowledgeStatus[i].myPA)
        }
      const maPAAverage = maPAArray.reduce((acc, val) => acc+val,0)/maKnowledgeStatus.length;
      const maPA = Number(maPAAverage.toFixed(0))

      const maLCArray = [];
        for (let i=0; i < maKnowledgeStatus.length; i++) {
          maLCArray.push(maKnowledgeStatus[i].myLC)
        }
      const maLCAverage = maLCArray.reduce((acc, val) => acc+val,0)/maKnowledgeStatus.length;
      const maLC = Number(maLCAverage.toFixed(0))


      const maData = {
        "maKF": maKF, 
        "maLF": maLF,
        "maPEDh": maPEDh,
        "maPEXh": maPEXh,
        "maPA": maPA,
        "maLC": maLC
      }
      
        //res.status(200).json(maKnowledgeStatus)
        res.status(200).json(maData)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getMyKnowledgeData = async (req, res) => {

    const myKDId = req.params.id;
    try {
      const myKFData = await ProfessionalStatusModel
        .findById(myKDId);
        /* const myCStatus = myKFData.myCStatus;
        const careerPathStatus = myKFData.careerPathStatus;
        myKFData.careerPathStatus = await levelChecker(myCStatus, careerPathStatus)
        
        console.log("meinStatus:", myCStatus,"career:", careerPathStatus) */
        
  
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
    const newKData = await ProfessionalStatusModel.create(req.body)

    res.send(`Data created and saved. ID:${newKData._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateMyKnowledgeData = async (req, res) => {

    const DataId = req.params.id;
    try {
        const myKData = await ProfessionalStatusModel
        .findOneAndUpdate(DataId, req.body);
  
      res.json(myKData)
    } catch (error) {
      res.send(error.message)
    }
  
  }

