import express from "express"
import ProfessionalStatus from "../models/professionalStatusModel.js"

/**
 * @param {express.Request} req
 * @param {express.Response} res
 */

const levelChecker =(myCStatus, careerPathStatus)=>{
     if (myCStatus === 0) {careerPathStatus="no level"}
else if (myCStatus === 1) {careerPathStatus="Student"}
else if (myCStatus === 2) {careerPathStatus="Newly Qualified Lighting Designer"}
else if (myCStatus === 3) {careerPathStatus="Junior Lighting Designer"}
else if (myCStatus === 4) {careerPathStatus="Project Lighting Designer"}
else if (myCStatus === 5) {careerPathStatus="Senior Lighting Designer"}
else if (myCStatus === 6) {careerPathStatus="Associate Lighting Designer"}
else if (myCStatus === 7) {careerPathStatus="Principal lighting designer / practice owner"}
else if (myCStatus === 8) {careerPathStatus="Master Lighting Designer"}
else if (myCStatus === 9) {careerPathStatus="Authorised expert"}
else if (myCStatus === 10) {careerPathStatus="Educator"}
else if (myCStatus === 11) {careerPathStatus="Educator and Researcher"}
else if (myCStatus === 12) {careerPathStatus="Journalist / Promoter"}
else {careerPathStatus="no level"}
console.log(myCStatus, careerPathStatus)
return(careerPathStatus)
}
 export default levelChecker