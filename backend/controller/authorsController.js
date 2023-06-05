import authorModel from '../models/authorModel.js'

export const getAllAuthors = async (req, res) => {
    try {
    const author = await authorModel.find()
        res.status(200).json(author)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

export const getAuthor = async (req, res) => {

    const authorsId = req.params.id;
    try {
      const author = await authorModel
        .findById(authorsId);
      res.json(author);   
     
    } catch (error) {
      res.send(error.message)
    }
  }


export const addAuthor = async (req, res) => {
    try {
    const newAuthor = await authorModel.create(req.body)
    //const person = await PersonModel.find()
    //res.status(200).json(newPerson)
    res.send(`Author created and saved. ID:${newAuthor._id}`)
    } catch (error) {
        console.log(error)
        res.status(409).send(error.message)
    }
}

export const updateAuthor = async (req, res) => {

    const authorId = req.params.id;
    try {
        const author = await authorModel.findOneAndUpdate(authorId, req.body);
  
      res.json(author)
    } catch (error) {
      res.send(error.message)
    }
  }

