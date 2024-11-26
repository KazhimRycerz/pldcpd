import mongoose from 'mongoose';
import ContactModel from './contactModel.js';

const pacSchema = mongoose.Schema({
   pacType: {
      type: String,
      //default: "",
      required: true,
      enum: ["membership", "active member", "socializing", "award", "competition", "creating learning sources"]
   },
   pacNo: {
      type: String,
      default: "tobedecided"
      //required: true,
   },
   description: {
   type: String,
   validate: {
      validator: (description) => description.length <= 100,
      message: (description) =>  `Die Beschreibung ist zu lang. Bitte kürzen`// input beinhaltet die Eingabe des Nutzers
      }
   },
   details:{
      type: String
      },
   level:{
      type: String
      },
   paPoints: {
      type: Number,
      default: 0,
      required: true
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
   startDateOfPAC: {
      type: Date,
      default: null,
   },
   endDateOfPAC: {
      type: Date,
      default: null,
   },
   updatedOn: Date,
   updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
   }
});
pacSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
   pacSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.updatedAt = new Date();
   next(); // jetzt wird save aufgerufen
});

pacSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedOn: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const pacModel = mongoose.model("pacActivity", pacSchema);
export default pacModel;

