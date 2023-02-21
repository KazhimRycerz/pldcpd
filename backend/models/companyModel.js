import mongoose from 'mongoose';
import ContactModel from './contactModel.js';

const companySchema = mongoose.Schema({
   companyName: {
      type: String,
      default: "Unknown",
      required: true,
   },
   address: {
      type: String,
      default: "Unknown",
   },
   eMail: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   createdOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   updatedOn: Date
})

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

