import mongoose from 'mongoose';

const courseSchema = mongoose.Schema({
   topic: {
      type: String,
      default: "",
      required: true,
   },
   author: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "contact",
      default: "",
   }],
   courseType: {
      type: String,
      default: "",
      enum: ["Literatur-Fachbuch","Literatur-Fachartikel", "OnlineSeminar", "LifeSeminar", "Workshop", "Vortrag",""],
      required: true,
   },
      courseContent: {
      type: String,
      validate: {
         validator: (courseContent) => body("courseContent").isLength({ max: 300 }),
         message: (courseContent) =>  `Die Beschreibung ist zu lang. Bitte kürzen`// input beinhaltet die Eingabe des Nutzers
       }
   },
   courseImage: {
      type:String,
      default: ""
    },
   cpdBasicPoints: {
      type: Number,
      default:"",
      required: true
   },
   cpdAdditionalPoints: {
      type: Number,
      default:"",
      required: true
   },
   topicField:{
      type: String,
      default: "",
      required: true,
   },
   linkToProvider: {
      type: String,
      default:"",
      required: true,
   },
   professionalLevel: {
      type: String,
      required: true,
   },
   active: Boolean,
   createdOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   startDateOfCourse: {
      type: Date,
      default: "",
   },
   endDateOfCourse: {
      type: Date,
      default: "",
   },
   updatedOn: Date,
   updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contact",
      default: "63ea64b974720450742a2dd0",
   }
});
courseSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE
   courseSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.updatedAt = new Date();
   next(); // jetzt wird save aufgerufen
});

courseSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedOn: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const courseModel = mongoose.model("courseOffer", courseSchema);
export default courseModel;

