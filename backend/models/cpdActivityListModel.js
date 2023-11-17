import mongoose from 'mongoose';

const cpdActivityListSchema = mongoose.Schema({
   activityCounter: {
      type: Number,
      required: true,
   },
   activity: {
      type: Boolean, 
      required: true,
      default: true,
    },
   activityType: {
      type: String,
      enum: ["AB", "WB", "LA", "PR", "VA", "AW","CO", "RP", "AU", "XX"],
      required: true,
      default: "XX",
   },
   courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
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
      type: Number
    },
    earnedPA:{
      type: Number
    },
    earnedLC:{
      type: Number
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
   valueDate:{
      type: Date,
      default: null,
   },
   lastUpdate: { // Hinzugefügt, wenn du es verwenden möchtest
      type: Date,
      default: Date.now,
    },   
});
cpdActivityListSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
cpdActivityListSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   //console.log('mongoose save() aufgerufen');
   this.lastUpdate = new Date();
   next(); // jetzt wird save aufgerufen
});

/* cpdActivityListSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ lastUpdate: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } ); */

const cpdActivityListModel = mongoose.model("cpdActivityList", cpdActivityListSchema);
export default cpdActivityListModel;

