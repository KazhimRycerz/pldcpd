import React, { useState, useRef, useContext, useEffect, useCallback } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./ContactForm.scss";
import { DoubleRightOutlined, CloseOutlined, EditOutlined, SaveOutlined, StopOutlined, StepBackwardOutlined, StepForwardOutlined  } from "@ant-design/icons";
import { Modal, Button } from 'antd';
import Moment from "moment"
import Swal from "sweetalert2";
import { IndustryField, ListOfCompanyType, ListOfCountryCodes } from "../ListsOfData/ListOfData.jsx";
import { FehlendeZugangsrechte } from "../FehlermeldungenSwal/FehlermeldungenSwal.jsx"


const ContactPage =() => {
   const { isAuth, setGotoPage, accessRights, navigate, userMode, setUserMode} = useContext(SectionsContext);


   return (
   <main id="contactMain">
      <div className="headBox"> 
          <h2 id="companyHead">Eingabe / Bearbeiten von Kontakten</h2>
          <p className="closingFunction" onClick={() => navigate("/home")}>Formular schließen</p>
        </div>
   </main>

   )


}

export default ContactPage