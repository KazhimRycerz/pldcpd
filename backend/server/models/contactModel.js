import mongoose from 'mongoose';
import KnowledgeModel from './knowledgeModel.js';

const addressSchema = mongoose.Schema({
   city: {
      type: {
         zip: String,
         name: String
      },
      required: true,
   },
   street: {
      type: String,
      minLength: 5,
   },
   countrycode: {
      type: String,
      length: 2,
      enum: ["DE", "GB", "IT"]
   }
})

//

const personSchema = mongoose.Schema({
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
   address: {
      type:addressSchema,
      required: false,
   },
   dateOfBirth: {
      type: date/*,
       validate: {
         validator: (userInput) => Number.isInteger(userInput),
         message: (userInput) => `${userInput.value} ist keine ganze Zahl.`
        } */
   },

   knowledgeData: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Knowledge'
      },
   createdOn:{
      type: Date,
      immutable: true,
      default: ()=> new Date(), 
   },
   updatedOn: Date
})

// MONGOOSE MIDDLEWARE
personSchema.pre('save', function(next) {
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .save() 
   // ausgeführt
   console.log('mongoose save() aufgerufen');
   this.updatedAt = new Date();
   next(); // jetzt wird save aufgerufen
})

personSchema.pre(['findOneAndUpdate', 'updateOne'], function(next){
   // Diese Callback-Function wird jedes mal VOR dem Aufruf von .findOneAndUpdate() 
   // und updateOne() ausgeführt
   console.debug('mongoose findOneAndUpdate oder updateOne aufgerufen');
   this.set({ updatedAt: new Date() }); 
   next(); // ohne next würde save() niemals ausgeführt werden
 } );

const PersonModel = mongoose.model("Person", personSchema);
export default PersonModel;


// ****************************************
// ***** Funktionen zum Testen ****** 
// ****************************************
// (gehören eigentlich hier nicht rein)

// Der Code in den nachfolgenden Funktionen würde sich normalerweise in einem Controller befinden.
// Aber um Zeit zu sparen und alles an einer Stelle zu haben, benutzen wir
// in dieser Datei zwei Test-Funktionien mit denen wir den Code von oben
// ausprobieren können


function testVirtual() {
   const somePerson = new PersonModel({
     firstName: "Paul Pawloski",
     eMail: "Person_new4000@gmail.de",
     age: 25 
   });
 
   console.log("somePerson.firstName", somePerson.firstName)
   console.log("somePerson.age", somePerson.age)
   console.log("somePerson.userName", somePerson.userName)
 }
 // testVirtual();
 
 async function testMiddleware(){
   // >>> 1. neue Person (regina) erzeugen <<<<
   const regina = new PersonModel({ // Person ist 
     firstName: "Regina Pawloski",
     email: "Reginap4000@gmail.de",
     age: 26
   });
 
   // Person mittels save() in Datenbank speichern
   // => ruft unsere pre middleware auf 
   // => middleware setzt updatedAt auf aktuelle Zeit/Datum mittels new Date()
   //    und ruft DANN erst save auf
   await regina.save(); 
 
   // >>> 2. Person Regina updaten (Namen ändern) <<<<
 
   // => ruft auch unsere middleware auf
   // => unsere pre middleware setzt jetzt auch updatedAt und ruft DANN erst updateOne auf
   const res = await regina.updateOne({firstName:"Regina Müller" }) 
   console.log({res})
 }
 // testMiddleware();