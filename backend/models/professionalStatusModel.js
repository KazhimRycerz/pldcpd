import mongoose from 'mongoose';

const professionalStatusSchema = mongoose.Schema({
   active: {
      type:Boolean,
      default: true
   },
   careerPathStatus: {
      type: String,
      default: "0_no level",
      enum: ["0_no level",
      "1_Student", 
      "2_Newly Qualified Lighting Designer", 
      "3_Junior Lighting Designer", 
      "4_Project Lighting Designer", 
      "5_Senior Lighting Designer", 
      "6_Associate Lighting Designer", 
      "7_Principal lighting designer / practice owner", 
      "8_Master", 
      "9_Authorised expert", 
      "10_Educator", 
      "11_Educator and Researcher", 
      "12_Journalist / Promoter"],
      require: true
   },   
   myKF: {
      type: Number,
      default: 0,
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
   myLC: {
      type: Number,
      default: 0,
      require: true
   },
   myCStatus: {
      type: Number,
      default: 0,
      enum: [1, 2, 3,4,5,6,7,8,9,10],
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
})

// MONGOOSE MIDDLEWARE
professionalStatusSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() oder updateOne() aufgerufen');
   this.updatedOn = new Date();
   next(); // jetzt wird save aufgerufen
})

professionalStatusSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedOn: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const ProfessionalStatusModel = mongoose.model("professionalStatus", professionalStatusSchema);
export default ProfessionalStatusModel;