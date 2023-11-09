import mongoose from 'mongoose';

const accessRightsSchema = mongoose.Schema({
   level: {
      type: Number,
      required: true,
      unique: true
   },
   description: {
      type: String,
      required: false,
      unique: true
   },
   active: {
      type: Boolean,
      required: true,
      default: false
   }
   
});
accessRightsSchema.set('strictQuery', true);

const accessRightsModel = mongoose.model("accessRight", accessRightsSchema);
export default accessRightsModel;

