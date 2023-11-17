import mongoose from 'mongoose';

const learningListSchema = mongoose.Schema({
   courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
   bookingNo: {
      type: String,
      default: "",
      //required: true,
   },
   courseActive: {
      type: Boolean,
      required: true,
      enum: ["true", "false"],
      default: "true",
    },
   listedOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   startedCourse: {
      type: Date,
      default: null,
   },
   finishedCourse: {
      type: Date,
      default: null,
   },
   statusOfCourseDuration: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
      required:true
    },
    numberOfModulesFinished: {
      type: Number,
      min: 0,
      max: 20,
      default: 0,
      required:true
    },
    cpdPointsGained: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
      required:false
    },
    lastUpdate: { 
      type: Date,
      default: Date.now,
    },
   
});
learningListSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
learningListSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.lastUpdate = new Date();
   next(); // jetzt wird save aufgerufen
});

learningListSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ lastUpdate: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const learningListModel = mongoose.model("learningList", learningListSchema);
export default learningListModel;

