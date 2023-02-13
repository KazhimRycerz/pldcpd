import mongoose from 'mongoose';
import KnowledgeModel from './knowledgeModel.js';

const addressSchema = mongoose.Schema({
   city: {
      type: {
         zip: String,
         name: String
      },
      required: true,
   },
   street: {
      type: String,
      minLength: 5,
   },
   countrycode: {
      type: String,
      length: 2,
      enum: ["DE", "GB", "IT"]
   }
})

//

const contactSchema = mongoose.Schema({
   firstName: {
      type: String,
      default: "Unknown",
   },
   lastName: {
      type: String,
      default: "Unknown",
   },
   eMail: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   address: {
      type:addressSchema,
      required: false,
   },
   dateOfBirth: {
      type: Date/*,
       validate: {
         validator: (userInput) => Number.isInteger(userInput),
         message: (userInput) => `${userInput.value} ist keine ganze Zahl.`
        } */
   },

   knowledgeData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Knowledge'
      },
   createdOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   updatedOn: Date
})

// MONGOOSE MIDDLEWARE
contactSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.updatedAt = new Date();
   next(); // jetzt wird save aufgerufen
})

contactSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedAt: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const ContactModel = mongoose.model("Contact", contactSchema);
export default ContactModel;

