import mongoose from "mongoose";
import contactModel from "./contactModel.js";
import companyModel from "./companyModel.js";

const careerSchema = mongoose.Schema({
   contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contact",
      required: true
   },
   company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "company",
      required: true
    },
   department: {
      type: String,
      required: false,
      unique: false,
   },
   position: {
      type: String,
      required: false,
      unique: false
   },
   eMail: {
      type: String,
      required: false,
      unique: false,
      trim: true,
      default:""
   },
   directPhoneContact: {
      type: String,
      required: false,
      unique: false,
   },
   startDate:{
      type: Date,
      immutable: false,
      default: ""
   },
   endDate:{
      type: Date,
      immutable: false,
      default: ""
   },
   active: {
      type:Boolean,
      default: true
   },
   timeSpan:{
      type: Number,
     /*  default: ()=> new Date()-startDate, */
   },
   createdOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   updatedOn: Date
});
careerSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
careerSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.updatedAt = new Date();
   next(); // jetzt wird save aufgerufen
})

careerSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedAt: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const CareerModel = mongoose.model("career", careerSchema);
export default CareerModel;