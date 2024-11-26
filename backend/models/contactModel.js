import mongoose from 'mongoose';
import ProfessionalStatusModel from './professionalStatusModel.js';
import CareerModel from './careerModel.js';
import AuthorModel from './authorModel.js';
import CompanyModel from './companyModel.js';
import cpdTrackerModal from './cpdTrackerModel.js';
import professionalTrackerModal from './professionalTrackerModel.js';


const contactSchema = mongoose.Schema({
   firstName: {
      type: String,
      default: ""
   },
   lastName: {
      type: String,
      default: ""
   },
   professionalTitle:{
      type: String,
      default:""
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
      default:""
   },
    origin: {
      type: String,
      default: ""
    },
   /* address: {
      type: addressSchema,
      required: false,
      default:""
   }, */
   currentCompany: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'company',
      default: null
    },
   professionalStatus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'professionalStatus',
      default: null   
   },
   careerPath: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'career',
      default: null
    }],
    cpdTracker: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cpdTracker',
      default: null
    }],
    professionalTracker: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'professionalTracker',
      default: null
    }],
    authorsData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'author',
      default: null
    },
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
});
contactSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
contactSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   //console.log('mongoose save() aufgerufen');
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

