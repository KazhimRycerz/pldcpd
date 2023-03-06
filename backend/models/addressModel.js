import mongoose from 'mongoose';

const addressSchema = mongoose.Schema({
   city: {
      type: String,
      default: "Unknown",
      required: false,
   },
   zip:{
      type: String,
      default: "Unknown",
      required: false,
   },
   street: {
      type: String,
      minLength: 5,
      default: "Unknown",
      required: false,
   },
   countryCode: {
      type: String,
      length: 2,
      enum: ["DE", "GB", "IT", "US"]
   },
   createdOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   updatedOn: Date
})

// MONGOOSE MIDDLEWARE
addressSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.updatedAt = new Date();
   next(); // jetzt wird save aufgerufen
})

addressSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedOn: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const AddressModel = mongoose.model("Address", addressSchema);
export default AddressModel;

