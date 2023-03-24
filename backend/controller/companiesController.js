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
    const companyId = req.params.id;
    try {
      const company = await CompanyModel
        .findById(companyId);

      console.log("company.name", company.companyName); 
    // hier kann ich auf das virtuelle Feld "firstName" zugreifen
    // obwohl dieses nicht in der Datenbank exisitert 
    // (deswegen bezeichnet man es als virtuell)
      
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

    const companyId = req.params.id;
    try {
        const company = await CompanyModel.findOneAndUpdate(companyId, req.body);
  
      res.json(contact)
    } catch (error) {
      res.send(error.message)
    }
  
  }

