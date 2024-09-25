import mongoose from 'mongoose';
import ContactModel from './contactModel.js';

const companySchema = mongoose.Schema({
   addressNature: {
      type: String,
      enum: ["private", "business"]
   },
   companyType: {
      type: String,
      default: "??",
      required: true,
   },
   companyName: {
      type: String,
      default: "",
      required: true,
   },
   companyBranch: {
      type: String,
      default: "Unknown",
      default: true,
   },
   companyCountryCode: {
      type: String,
      length: 2,
      //enum: ["DE", "GB", "IT", "US"]
   },
   companyZip:{
      type: String,
      default: "Unknown",
      required: false,
   },
   companyCity: {
      type: String,
      default: "Unknown",
      required: false,
   },
   companyStreet: {
      type: String,
      minLength: 5,
      default: "Unknown",
      required: false,
   },
   cpdProvider: {
      type: Boolean,
      default: false,
   },
   companyClientID: {
      type: String,
      unique: false,
      default: "Unknown",
      required: false
   },
   companyUstID: {
      type: String,
      default: "Unknown",
   },
   companyHomepage: {
      type: String,
      default: "Unknown",
   },
   companyEmail: {
      type: String,
      required: false,
      unique: false,
      trim: true
   },
   companyActive: {
      type: Boolean,
      default: true,
   },
   createdOn:{
      type: Date,
      immutable: true,
      default: () => new Date(), 
   },
   updatedOn: Date,

   updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
   }
});
companySchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
companySchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.updatedAt = new Date();
   next(); // jetzt wird save aufgerufen
})

companySchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedOn: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const CompanyModel = mongoose.model("company", companySchema);
export default CompanyModel;

