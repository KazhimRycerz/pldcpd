import mongoose from 'mongoose';
import ProfessionalStatusModel from './professionalStatusModel.js';

const authorSchema = mongoose.Schema({
   fieldsOfExpertise: {
      type: Array,
      default: []
   },
   careerSummary: {
      type: String,
      default: ""
   },
   createdOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date() 
   },
   updatedBy:{
      type: String,
      immutable: false
   },
   updatedOn: Date
});
authorSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
authorSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.updatedAt = new Date();
   next(); // jetzt wird save aufgerufen
})

authorSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedAt: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const authorModel = mongoose.model("author", authorSchema);
export default authorModel;

