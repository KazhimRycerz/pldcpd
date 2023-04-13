import mongoose from "mongoose";
//import LearningDeskModel from "./learningDeskModel.js"
import ContactModel from './contactModel.js';

const userSchema = mongoose.Schema({

  firstName: {
    type: String,
    default: ""
  },
  lastName: {
    type: String,
    default: ""
  },
  userName: {
    type: String,
    default: "",
    unique: true
  },
  eMail: {
    type: String,
    required: true,
    unique: false, 
    trim: true,
    validate: {
      validator: (userInput) => userInput.includes("@"),
      message: (userInput) =>  `${userInput.value} is not a valid e-mail-address. Check your input, please!`// input beinhaltet die Eingabe des Nutzers
    }
  },
  password: {
    type: String,
    default: "",
    required: true
  },
  userImage: {
    type:String,
    default: ""
  },
  accessRights: [{
    type: Number,
    enum: [0,1,2,3,4,5],
    default:1
  }],
  active: {
    type: Boolean,
    enum: ["true", "false"],
    default: true
  },
  contactData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'contact',
    default: ""
    },
  createdAt: {
    type: Date,
    immutable: true, // wert wird nach Erstellung nicht upgedatet
    default: () => new Date() // wenn wir das Document erzeugen, wird Date gesetzt
  },
  updatedAt: Date 
});
userSchema.set('strictQuery', true);

// MONGOOSE MIDDLEWARE (pre hook)
userSchema.pre(['save'], function(next) {
  // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() ausgeführt
  this.updatedAt = new Date();
  next(); // jetzt wird save aufgerufen
})


userSchema.pre(['findOneAndUpdate', 'updateUser'], function(next){
  // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
  // und updateOne() ausgeführt
  //console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
  this.set({ updatedAt: new Date() }); 
  next(); // ohne next würde save() niemals ausgeführt werden
} );


const UserModel = mongoose.model("user", userSchema);
export default UserModel;


