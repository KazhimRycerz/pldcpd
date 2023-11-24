import express, { Router } from "express"
import { /* filterCountryCode, */ addCountryCode, getAllCountryCodes, getCountryCode, updateCountryCode, deleteCountryCode } from '../controller/countryCodeController.js'


const router = Router()
/* router
.get("/", getAllCompanies )
.post("/", registerCompany )
.patch("/:id", updateCompany)
.get("/:id", getCompany); */

router.route("/")
    .get(getAllCountryCodes )
    .post(addCountryCode);
/* router.route("/countrycodefilter")
    .get(filterCountryCode ) */
router.route("/:id")
    .patch(updateCountryCode)
    .get(getCountryCode)
    .delete(deleteCountryCode)

export default router
