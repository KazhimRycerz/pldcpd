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
   professionalTitle:{
      type: String,
      default:"",
   },
   salutation: {
      type: String,
      default: "",
      enum: ["Herr", "Frau", "Mr.", "Mrs", ""]
    },
    gender: {
      type: String,
      default: "",
      enum: ["female", "male", "intersex", "trans", "non-conforming", "personal", "eunuch", ""]
    },
   appendix: {
      type: String,
      default:"",
   },
    origin: {
      type: String,
      default: "",
    },
   /* address: {
      type: addressSchema,
      required: false,
      default:""
   }, */
   currentCompany: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'company',
      default: ""
    }],
   professionalStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'professionalStatus',
      default: ""   
      },
   careerPath: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'career',
      default: []
    }],
   dateOfBirth: {
      type: Date,
      default: ""
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

