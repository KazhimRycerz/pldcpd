import React from "react";
import axiosConfig from "../../util/axiosConfig";
import Swal from "sweetalert2";
import "./NextBtnRegister.scss"

function NextBtnToStepTwo({ props }) {
  const uniqueUserName = async () => {
    try {
      const axiosResp = axiosConfig.get(`/user/username/${props.userName}`);
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
        title: `Benutzername "${userExists}"`,
        text: " ist bereits vergeben.",
      })
    } else if (
      props.userName.length > 20 ||
      (props.userName.length < 4 && props.userName.length > 0)
    ) {
      Swal.fire({
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
    <span className="buttonBasics weiterButton" onClick={validateInput} id="nextBtnToTwo">
      weiter >>
    </span>
  );
}

const NextBtnToThree = ({ props }) => {
  const setThreeTrue = () => {
      props.setTwo(false);
      props.setThree(true);
  };
  return (
    <span className="buttonBasics weiterButton" onClick={setThreeTrue} id="nextBtnToThree">
      weiter >>
    </span>
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
    <input
      onClick={validateDataStepThree}
      type="submit"
      value="daten senden"
      className="buttonBasics submitButtonRegister"
      id="submitBtnRegister"
    />
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
    <span onClick={resetAll} className="buttonBasics resetButton">
      Reset
    </span>
  );
};

export { NextBtnToStepTwo, NextBtnToThree, SubmitBtn, ResetBtn };
