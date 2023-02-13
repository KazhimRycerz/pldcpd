import mongoose from 'mongoose';

const knowledgeSchema = mongoose.Schema({

   myKF: {
      type: Number,
      default: 0
   },
   myLF: {
      type: Number,
      default: 0
   },
   myPEDh: {
      type: Number,
      default: 0
   },
   myPEXh: {
      type: Number,
      default: 0
   },
   myLP: {
      type: Number,
      default: 0
   },
   myLC: {
      type: Number,
      default: 0
   },
   myCStatus: {
      type: Number,
      default: 0,
      enum: [1, 2, 3,4,5,6,7,8,9,10]
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
knowledgeSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() oder updateOne() aufgerufen');
   this.updatedOn = new Date();
   next(); // jetzt wird save aufgerufen
})

knowledgeSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedOn: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const KnowledgeModel = mongoose.model("Knowledge", knowledgeSchema);
export default KnowledgeModel;