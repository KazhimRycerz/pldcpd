import CountryCodeModel from '../models/countryCodeModel.js'

export const getAllCountryCodes = async (req, res) => {
    try {
    const countryCode = await CountryCodeModel.find()
        res.status(200).json(countryCode)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getCountryCode = async (req, res) => {
  const countryCodeId = req.params.id;
  try {
    const countryCode = await CountryCodeModel
    .findById(countryCodeId);
    res.json(countryCode);    
  } catch (error) {
    res.send(error.message)
  }
}

/* export const filterCountryCode = async (req, res) => {
  //onst countryCodeFilter = req.query.kurzCode; // Den Filterwert aus der Abfrage abrufen
  //console.log(req)
  const countryCodeFilter = req;
  try {
    const countryCodes = await CountryCodeModel.find({
      landBezeichnung: { $regex: new RegExp(countryCodeFilter, 'i') },
    });
    //console.log(countryCodes)
    res.json(countryCodes);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
//filterCountryCode() */
  
export const addCountryCode = async (req, res) => {
  console.log(req)
    try {
    const newCountryCode = await CountryCodeModel.create({
      type: req.body.type
    })
      console.log(newCountryCode)
    res.send(`Der Ländercode wurde wurde angelegt und gesichert mit der ID:${newCountryCode._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateCountryCode = async (req, res) => {
  console.log(req.body)
  const countryCodeId = req.body.countryCodeId;
  try {
    const updatedCountryCode = {
      //type: req.body.type
    };
    const CountryCode = await CountryCodeModel.findByIdAndUpdate(_.id, updatedCountryCode, { new: true });
    res.json(CountryCode);
  } catch (error) {
      res.send(error.message);
  }
}

export const deleteCountryCode = async (req, res) => {
  try {
    const deleteCountryCode = await CountryCodeModel.deleteOne({_id: req.params.id});
    res.status(202).send({ message: "Land wurde erfolgreich gelöscht" });
  } catch (error) {
    res.status(404).send({message: "Fehler, das Land konnte nicht gelöscht werden"});
  }
};


