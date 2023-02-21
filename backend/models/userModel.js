import mongoose from 'mongoose';
import ConatctModel from './contacModel.js';

const userSchema = mongoose.Schema({
   firstName: {
      type: String,
      default: "Unknown",
   },
   lastName: {
      type: String,
      default: "Unknown",
   },
   eMail: {
      type: String,
      required: true,
      unique: true,
      trim: true
   },
   carrerPath: [{
      type: 
   }]
   createdOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   updatedOn: Date
})

// MONGOOSE MIDDLEWARE
userSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.updatedAt = new Date();
   next(); // jetzt wird save aufgerufen
})

userSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedOn: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const UserModel = mongoose.model("User", userSchema);
export default UserModel;

