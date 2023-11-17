import mongoose from 'mongoose';
import ContactModel from './contactModel.js';

const courseSchema = mongoose.Schema({
   courseTopic: {
      type: String,
      //default: "",
      required: true,
      validate: {
         validator: (courseTopic) => courseTopic.length <= 100,
         message: (courseTopic) =>  `Der Titel ist zu lang. Bitte kürzen`// input beinhaltet die Eingabe des Nutzers
         }
   },
   bookingNo: {
      type: String,
      default: "tobedecided",
      //required: true,
   },
   author: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "contact",
         /* default:[], */
         required: true,
      }]
   ,
   topicField:{
      type: String,
      //default: "",
      required: true,
   },
   courseType: {
      type: String,
      //enum: ["Fachbuch","Fachartikel", "OnlineSeminar", "LifeSeminar", "Workshop", "Vortrag",""],
      required: true,
   },
   courseContent: {
   type: String,
   validate: {
      validator: (courseContent) => courseContent.length <= 500,
      message: (courseContent) =>  `Die Beschreibung ist zu lang. Bitte kürzen`// input beinhaltet die Eingabe des Nutzers
      }
   },
   courseImage: {
      type: Array,
      default: [],
   },
   courseLanguage: {
      type: Array,
      default: [],
      //enum: ["English", "German", "French", "Italian", "Spanish", "Chinese"]
   },
   minTeilnehmer: {
      type: Number,
      min: 0,
      default: 0
   },
   maxTeilnehmer: {
      type: Number,
      min: 0,
      default: 0
   },
   cpdBasicPoints: {
      type: Number,
      default: 0,
      required: true
   },
   cpdAdditionalPoints: {
      type: Number,
      default: 0,
      required: true
   },
   linkToProvider: {
      type: String,
      default:"",
      //required: true,
   },
   professionalLevel: {
      type: Number,
      required: true,
      default: 0,
      //enum:"0",
   },
   active: {
      type:Boolean,
      default: true
   },
   createdOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   startDateOfCourse: {
      type: Date,
      default: null,
   },
   endDateOfCourse: {
      type: Date,
      default: null,
   },
   courseDuration: {
      type: String,
      default: "",
   },
   updatedOn: Date,
   updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
   }
});
courseSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
   courseSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.updatedAt = new Date();
   next(); // jetzt wird save aufgerufen
});

courseSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedOn: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const courseModel = mongoose.model("courseOffer", courseSchema);
export default courseModel;

