import mongoose from 'mongoose';
import ContactModel from './contactModel.js';

const companySchema = mongoose.Schema({
   companyName: {
      type: String,
      default: "",
      required: true,
   },
   companyType: {
      type: String,
      default: "??",
      required: true,
   },
   city: {
      type: String,
      default: "Unknown",
      required: false,
   },
   zip:{
      type: String,
      default: "Unknown",
      required: false,
   },
   street: {
      type: String,
      minLength: 5,
      default: "Unknown",
      required: false,
   },
   countryCode: {
      type: String,
      length: 2,
      enum: ["DE", "GB", "IT", "US"]
   },
   homepage: {
      type: String,

   },
   cpdProvider: {
      type: Boolean,
      default: false,
   },
   internalClientID: {
      type: String,
      unique: true,
      required: false
   },
   branch: String,
   active: {
      type: Boolean,
      default: true,
   },
   ustID: {
      type: String
   },
   companyEmail: {
      type: String,
      required: false,
      unique: false,
      trim: true
   },
   createdOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   updatedOn: Date,
   updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contact",
      default: "63ea64b974720450742a2dd0",
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

