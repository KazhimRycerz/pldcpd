import React from "react";
import axiosConfig from "../../util/axiosConfig";
import Swal from "sweetalert2";
import "./NextBtnRegister.scss"

function NextBtnToStepTwo({ props }) {
  const uniqueUserName = async () => {
    try {
      const axiosResp = axiosConfig.get(`http://localhost:4000/user/username/${props.userName}`);
      return (await axiosResp).data;
    } catch (error) {
      console.log(error.message);
    }
  };

  const validateInput = async () => {
    let userExists;

    if (props.userName.length > 0 && props.userName.length>3) {
      userExists = await uniqueUserName();
    }

    if (props.userName.length === 0) {
      Swal.fire({ title: "Benutzername", text: " ist ein Pflichtfeld." });
    } else if (userExists) {
      Swal.fire({
        icon: 'warning',
        title: `Benutzername "${userExists}"`,
        text: " ist bereits vergeben.",
      })
    } else if (
      props.userName.length > 20 ||
      (props.userName.length < 4 && props.userName.length > 0)
    ) {
      Swal.fire({
        icon: 'info',
        title: "Benutzername",
        text: " muss mindestens 4 Zeichen und maximal 20 Zeichen lang sein." })
    } else if (props.firstName.length === 0) {
      Swal.fire({ title: "Vorname", text: " ist ein Pflichtfeld." })
    } else if (props.lastName.length === 0) {
      Swal.fire({ title: "Nachname", text: " ist ein Pflichtfeld." });
    } else {
      props.setOne(false);
      props.setTwo(true);
    }
  };
  
  return (
    <span 
    className="buttonBasics" 
    onClick={validateInput} 
    id="nextBtnToTwo">
      weiter {'>>'} 
    </span>
  );
}

const BackBtnToOne = ({ props }) => {
  const setOneTrue = () => {
      props.setTwo(false);
      props.setOne(true);
  };
  return (
    <button 
    className="buttonBasics" 
    onClick={setOneTrue} 
    id="backBtnToOne">
      {'<<'} zurück
    </button>
  );
};

const NextBtnToThree = ({ props }) => {
  const setThreeTrue = () => {
      props.setTwo(false);
      props.setThree(true);
  };
  return (
    <button 
    className="buttonBasics" 
    onClick={setThreeTrue} 
    id="nextBtnToThree">
      weiter {'>>'}
    </button>
  );
};

const BackBtnToTwo = ({ props }) => {
  const setTwoTrue = () => {
      props.setTwo(true);
      props.setThree(false);
  };
  return (
    <button 
    className="buttonBasics" 
    onClick={setTwoTrue} 
    id="backBtnToTwo">
      {'<<'} zurück
    </button>
  );
};

const SubmitBtn = ({submitHandler, props }) => {
  const validateDataStepThree = async (e) => {
    e.preventDefault();
    const validateEmail = async () => {
      try {
        const axiosResp = axiosConfig.get(`/user/email/${props.email}`);
        return (await axiosResp).data;
      } catch (error) {
        console.log(error.message);
      }
    };
    let emailExists;
    if (props.password.length > 0) {
      emailExists = await validateEmail();
    }

    if (emailExists) {
      Swal.fire({
        title: "E-Mail Adresse bereits vergeben",
        text: "probieren Sie andere E-Mail",
      });
    } else {
      submitHandler();
    }
  };

  return (
    <button
    onClick={validateDataStepThree}
    type="submit"
    value="daten senden"
    className="buttonBasics"
    id="submitBtnRegister">
      Daten absenden
    </button>
  );
};

const ResetBtn = ({ props }) => {
  const resetAll = () => {
    if (!props.stepOne) props.setOne(true);
    if (props.stepTwo) props.setTwo(false);
    if (props.stepThree) props.setThree(false);
    if (props.userName !== "") props.setUserName("");
    if (props.firstName !== "") props.setFirstName("");
    if (props.lastName !== "") props.setLastName("");
    if (props.genderRadio !== "none") props.setGenderRadio("none");
    if (props.email !== "") props.setEmail("");
    if (props.password !== "") props.setPassword("");
    /* if (props.location !== "") props.setLocation(""); */
    /* if (props.disabilities !== "") props.setDisabilities(""); */
  };
  
  return (
    <button 
    onClick={resetAll} 
    className="buttonBasics">
      Reset
    </button>
  );
};

export { BackBtnToOne, NextBtnToStepTwo,BackBtnToTwo, NextBtnToThree, SubmitBtn, ResetBtn };
