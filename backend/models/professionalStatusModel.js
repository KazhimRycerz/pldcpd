import mongoose from 'mongoose';
import levelChecker from '../middleware/levelManager.js'

const professionalStatusSchema = mongoose.Schema({
   active: {
      type:Boolean,
      default: true
   },
   myCStatus: {
      type: Number,
      default: 0,
      enum: [0,1,2,3,4,5,6,7,8,9,10,11,12],
      require: true
   },
   myCPDLevel:{
      type: Object,
      enum: [
         {level: 0, description: 'Interest'},
         {level: 1, description: 'Student'},
         {level: 2, description: 'Newly Qualified Lighting Designer'},
         {level: 3, description: 'Junior Lighting Designer'},
         {level: 4, description: 'Project Lighting Designer'},
         {level: 5, description: 'Senior Lighting Designer'},
         {level: 6, description: 'Associate Lighting Designer'},
         {level: 7, description: 'Principal lighting designer / practice owner'},
         {level: 8, description: 'Master Lighting Designer'},
         {level: 9, description: 'Authorised expert'},
         {level: 10, description: 'Educator'},
         {level: 11, description: 'Educator and Researcher'},
         {level: 12, description: 'Journalist / Promoter'}
      ],
      default: {level: 0, Description:'Interest'}
   },
   careerPathStatus: {
      type: String,
      default: "no level",
      enum: ["no level",
      "Student", 
      "Newly Qualified Lighting Designer", 
      "Junior Lighting Designer", 
      "Project Lighting Designer", 
      "Senior Lighting Designer", 
      "Associate Lighting Designer", 
      "Principal lighting designer / practice owner", 
      "Master Lighting Designer", 
      "Authorised expert", 
      "Educator", 
      "Educator and Researcher", 
      "Journalist / Promoter"],
      require: true
   },   
   myKF: {
      type: Number,
      default: 50,
      require: true
   },
   myLF: {
      type: Number,
      default: 0,
      require: true
   },
   myPEDh: {
      type: Number,
      default: 0,
      require: true
   },
   myPEXh: {
      type: Number,
      default: 0,
      require: true
   },
   myLP: {
      type: Number,
      default: 0,
      require: true
   },
   myPA: {
      type: Number,
      default: 0,
      require: true
   },
   myLC: {
      type: Number,
      default: 0,
      require: true
   },
   cpdActiveSince:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   professionalSince:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   createdOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   updatedOn: Date
});
professionalStatusSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
professionalStatusSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.updatedOn = new Date();
   levelChecker(this.myCStatus, this.careerPathStatus)
   next(); // jetzt wird save aufgerufen
})

professionalStatusSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedOn: new Date()}); 
   levelChecker(this.myCStatus, this.careerPathStatus)
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const ProfessionalStatusModel = mongoose.model("professionalStatus", professionalStatusSchema);
export default ProfessionalStatusModel;