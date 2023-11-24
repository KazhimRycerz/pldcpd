import mongoose from 'mongoose';

const countryCodeSchema = mongoose.Schema({
   landBezeichnung: {
      type: String,
      required: true,
   },
   vorwahl: {
      type: Number,
      required: true,
   },
   kurzCode: {
      type: String,
      required: true,
   },
   länderCode: {
      type: String,

   },
   steuerBewertung:{
      type: Boolean
   }


   
});
countryCodeSchema.set('strictQuery', true);

const countryCodeModel = mongoose.model("countryCode", countryCodeSchema);
export default countryCodeModel;

