import CompanyModel from '../models/companyModel.js'

export const getAllCompanies = async (req, res) => {
    try {
    const companies = await CompanyModel.find()
        res.status(200).json(companies)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getCompany = async (req, res) => {
  //console.log(req.params.id)
  const companyId = req.params.id;
  try {
      const company = await CompanyModel
        .findById(companyId);
      //console.log("companyName", company.companyName); 
      res.json(company);   
     
    } catch (error) {
      res.send(error.message)
    }
  
  }

export const registerCompany = async (req, res) => {
    try {
    const newCompany = await CompanyModel.create(req.body)
    res.send(`Company was created and saved. ID:${newCompany._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateCompany = async (req, res) => {
//console.log(req.params.id)
    const companyId = req.params.id;
    try {
        const company = await CompanyModel.findOneAndUpdate({_id: companyId}, req.body, { new: true });
  
      res.json(company)
    } catch (error) {
      res.send(error.message)
    }
}

export const deleteCompany = async (req, res) => {
  const companyId = req.params.id;
  const companyName = req.body.companyName

  try {
    const deleteResult = await CompanyModel.deleteOne({ _id: companyId });

    if (deleteResult.deletedCount === 0) {
      return res.status(404).send({ message: "Firma nicht gefunden" });
    }

    res.status(200).send({ message: `Die Firma ${companyName} wurde erfolgreich gelöscht` });
  } catch (error) {
    res.status(500).send({ message: "Fehler, die Adresse konnte nicht gelöscht werden" });
  }
};

  

