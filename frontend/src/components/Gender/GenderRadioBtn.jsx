import React from "react";
import "./GenderRadioBtn.scss"

export default function GenderRadioBtn({ props, gender }) {
  const genderLabelValue = (gender) => {
    switch (gender) {
      case "female":
        return "weiblich";
        //break;
      case "male":
        return "männlich";
        //break;
      case "diverse":
        return "nicht binär";
        //break;
      default:
        return "keine Angabe";
    }
  };

  return (
    <>
      <label htmlFor={gender} className={gender===props.genderRadio?"buttonRadio":"buttonBasics"}>
        <input
          onClick={(e) => props.setGenderRadio(e.target.value)}
          type="radio"
          name="gender"
          id={gender}
          value={gender}
        />
        {genderLabelValue(gender)}
      </label>
    </>
  );
}
