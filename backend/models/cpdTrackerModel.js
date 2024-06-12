import mongoose from 'mongoose';
import contactModel from "./contactModel.js";
import courseModel from './courseModel.js';

const cpdTrackerSchema = mongoose.Schema({

   activityCounter: {
      type: Number,
      required: false,
   },
   contact: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contact",
    },
   active: {
      type: Boolean, 
      required: true,
      default: true,
    },
   activityType: {
      type: String,
      enum: ["CRE", "LEO", "PAC", "XXX"],//Creating a CPD, LearningOpportunity, Professional Activity
      required: true,
      default: "XXX",
   },
   courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseOffer",
    },
    description: {
      type: String,
    },
    /* earnedKF: {
      type: Number
    },
    earnedLF: {
      type: Number
    }, */
    /* earnedPEX:{
      type: Number
    },
    earnedPED:{
      type: Number
    }, */
    earnedLP:{
      type: Number,
      default: 0
    },
    addedLP:{
      type: Number,
      default: 0
    },
    totalLP:{
      type:Number,
      default: 0
    },
    earnedPA:{
      type: Number,
      default: 0
    },
   listedOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   startDate: {
      type: Date,
      default: null,
   },
   endDate: {
      type: Date,
      default: null,
   },
   statusOfCourse: {
      type: Date,
      default: null,
   },
   requestToEvaluate: {
      type: Boolean,
      default: false,
   },
   verified: {
      type: Boolean,
      default: false,
   },
   statusOfVerification:{
      type: String,
      enum: ["CPD listed", "CPD started", "CPD finished", "Request for verification", "CPD verified"],
      default: "CPD listed"
   },
   valueDate:{
      type: Date,
      default: null,
   },
   lastUpdate: { // Hinzugefügt, wenn du es verwenden möchtest
      type: Date,
      default: Date.now,
    },   
});
cpdTrackerSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
cpdTrackerSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() ausgeführt
   console.log('mongoose save() aufgerufen');
   this.lastUpdate = new Date();
   next(); // jetzt wird save aufgerufen
});

cpdTrackerSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ lastUpdate: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 });

const cpdTrackerModel = mongoose.model("cpdTracker", cpdTrackerSchema);
export default cpdTrackerModel;

