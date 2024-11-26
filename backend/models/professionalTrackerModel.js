import mongoose from 'mongoose';
import contactModel from "./contactModel.js";
import courseModel from './courseModel.js';
import pacModal from './pacModel.js';

const professionalTrackerSchema = mongoose.Schema({

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
      enum: ["PAC", "XXX"],//Creating a CPD, LearningOpportunity, Professional Activity, Professional Honor
      required: true,
      default: "PAC",
   },
   activityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pacActivity",
    },
    description: {
      type: String,
    },
    earnedKF: {
      type: Number
    },
    earnedLF: {
      type: Number
    }, 
    earnedPEX:{
      type: Number
    },
    earnedPED:{
      type: Number
    }, 
    earnedLP:{
      type: Number,
      default: 0,
      min: 0 
    },
    addedLP:{
      type: Number,
      default: 0,
      min: 0 
    },
    totalLP:{
      type:Number,
      default: 0,
      min: 0 
    },
    earnedPA:{
      type: Number,
      default: 0,
      min: 0 
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
      enum: ["PAC listed", "PAC started", "PAC finished", "Request for verification", "PAC verified"],
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
professionalTrackerSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE

// Vor jedem Speichern `totalLP` berechnen
professionalTrackerSchema.pre('save', function(next) {
   console.log('mongoose save() aufgerufen');
   this.totalLP = (this.earnedLP || 0) + (this.addedLP || 0); // Berechne totalLP
   this.lastUpdate = new Date(); // Aktualisiere lastUpdate
   next(); // Fortfahren
});

// Vor jedem Update `totalLP` berechnen
professionalTrackerSchema.pre(['findOneAndUpdate', 'updateOne'], function(next) {
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   const update = this.getUpdate();
   
   // Berechnung von totalLP nur durchführen, wenn earnedLP oder addedLP geändert werden
   if (update.$set && (update.$set.earnedLP !== undefined || update.$set.addedLP !== undefined)) {
      const earnedLP = update.$set.earnedLP ?? this.earnedLP;
      const addedLP = update.$set.addedLP ?? this.addedLP;
      update.$set.totalLP = (earnedLP || 0) + (addedLP || 0);
   }

   update.$set = {
      ...update.$set,
      lastUpdate: new Date(), // Aktualisiere lastUpdate
   };
   next();
});

const professionalTrackerModel = mongoose.model("professionalTracker", professionalTrackerSchema);
export default professionalTrackerModel;

