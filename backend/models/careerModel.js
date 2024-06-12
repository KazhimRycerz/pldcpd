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
   startDate: {
      type: Date,
      immutable: false,
      default: ""
   },
   endDate: {
      type: Date,
      immutable: false,
      default: ""
   },
   activated: {
      type: Boolean,
      default: true
   },
   typeOfValue:{
      type: String,
      default: ""
   },
   /* pex: {
      type: Boolean,
      default: false
   },
   ped: {
      type: Boolean,
      default: false
   },
   edu: {
      type: Boolean,
      default: false
   }, */
   timeSpan: {
      type: Number,
   },
   createdOn: {
      type: Date,
      immutable: true,
      default: () => new Date(), 
   },
   lastUpdateOn: Date
});
careerSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
careerSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes Mal VOR dem Aufruf von .save() ausgeführt
   console.log('mongoose save() aufgerufen');
   this.lastUpdateOn = new Date();
   
   if (this.startDate && this.endDate) {
      const timeSpan = (this.endDate - this.startDate) / (1000 * 60 * 60 * 24); // Zeitspanne in Tagen
      this.timeSpan = timeSpan;
   } else if (this.startDate && !this.endDate) {
      const timeSpan = (new Date() - this.startDate) / (1000 * 60 * 60 * 24); // Zeitspanne in Tagen
      this.timeSpan = timeSpan;
   }
   
   next(); // jetzt wird save aufgerufen
});

careerSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes Mal VOR dem Aufruf von .findOneAndUpdate() und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ lastUpdateOn: new Date() });
   
   const docToUpdate = this.getUpdate();
   if (docToUpdate.startDate && docToUpdate.endDate) {
      const timeSpan = (new Date(docToUpdate.endDate) - new Date(docToUpdate.startDate)) / (1000 * 60 * 60 * 24); // Zeitspanne in Tagen
      this.set({ timeSpan: timeSpan });
   }
   
   next(); // ohne next würde save() niemals ausgeführt werden
});

const CareerModel = mongoose.model("career", careerSchema);
export default CareerModel;
