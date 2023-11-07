import mongoose from 'mongoose';
import ContactModel from './contactModel.js';

const courseTypeSchema = mongoose.Schema({
   type: {
      type: String,
      required: true,
   }
   
});
courseTypeSchema.set('strictQuery', true);

const courseTypeModel = mongoose.model("courseType", courseTypeSchema);
export default courseTypeModel;

