import mongoose from 'mongoose';
import ProfessionalStatusModel from './professionalStatusModel.js';
import CareerModel from './careerModel.js';


const contactSchema = mongoose.Schema({
   firstName: {
      type: String,
      default: "",
   },
   lastName: {
      type: String,
      default: "",
   },
   titel:{
      type: String,
      default:"",
   },
   appendix: {
      type: String,
      default:"",
   },
   /* address: {
      type: addressSchema,
      required: false,
      default:""
   }, */
   professionalStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'professionalStatus',
      default: ""
      },
   careerPath: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "career",
      default: ""
    }],
   dateOfBirth: {
      type: Date/*,
       validate: {
         validator: (userInput) => Number.isInteger(userInput),
         message: (userInput) => `${userInput.value} ist keine ganze Zahl.`
        } */
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

const ContactModel = mongoose.model("contact", contactSchema);
export default ContactModel;

