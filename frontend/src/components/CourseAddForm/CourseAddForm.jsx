import React, { useState, useRef, useContext, useEffect } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./CourseAddForm.scss";
import { CloseOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
//import swal from "sweetalert";

const CourseAddForm = () => {
  const { isAuth, setGotoPage } = useContext(SectionsContext);

//const [file, setFile] = useState(null);
const [file, setFile] = useState("");
const [removed, setRemoved] = useState(false);
const [kursThema, setKursThema] = useState("");
const [kursAutor, setKursAutor] = useState([]);
const [themenfeld, setThemenfeld] = useState("");
const [kursTyp, setKursTyp] = useState("");
const [kursInhalt, setKursInhalt] = useState("");
const [professionalLevel, setProfessionalLevel] = useState("");
const [kursSprache, setKursSprache] = useState("");
const [cpdPoints, setCPDPoints] = useState("");
const [additionalCPDPoints, setAdditionalCPDPoints] = useState("");
const [linkProvider, setLinkProvider] = useState("");
const [kursStart, setKursstart] = useState("");
const [kursende, setKursende] = useState("");
const [eventDescription, setDescription] = useState("");
const { navigate } = useContext(SectionsContext);

const clearForm = () => {
  setFile("");
  setKursThema("");
  setKursAutor([""]);
  setThemenfeld("");
  setKursTyp("");
  setKursInhalt("");
  setProfessionalLevel("");
  setKursSprache("");
  setCPDPoints("");
  setAdditionalCPDPoints("");
  setLinkProvider("");
  setKursstart("");
  setKursende("");
  setDescription("");
}

const handleChange = (event) => {
  const { value, checked } = event.target;
  /* const { categories } = eventCategory;
  if (checked) {
    setEventCategory({ categories: [...categories, value] });
  } else {
    setEventCategory({ categories: categories.filter((e) => e !== value) });
  } */
};

const handleAuthorChange = (e) => {
  // Hier kannst du den Wert aus dem Eingabefeld hinzufügen oder entfernen
  const selectedAuthor = e.target.value;
  if (!kursAutor.includes(selectedAuthor)) {
    setKursAutor([...kursAutor, selectedAuthor]); // Hinzufügen des Autors zum Array
  } else {
    const updatedAuthors = kursAutor.filter((author) => author !== selectedAuthor);
    setKursAutor(updatedAuthors); // Entfernen des Autors aus dem Array
  }
};

const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    //console.debug(eventCategory);
    let imgToSave;
    if (removed || !file) {
      imgToSave = null;
    } else {
      imgToSave = formData.get("imageUpload");
    }

    const courseData = {
      //courseImage: imgToSave,
      courseTopic: kursThema,
      author: kursAutor,
      topicField: themenfeld,
      courseType: kursTyp,
      courseContent: kursInhalt,
      courseLanguage: kursSprache,
      professionalLevel: professionalLevel,
      cpdBasicPoints: cpdPoints,
      cpdAdditionalPoints: additionalCPDPoints,
      updatedBy: localStorage.getItem("userId"),
      /*startDateOfCourse: kursStart,
      time: eventTime,
      location: JSON.stringify(eventLocation),
      participants: eventParticipants,
      price: eventPrice,
      description: eventDescription, */
    };


    try {
      const response = await axiosConfig.post("/courses", courseData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("reponsData", response.data);
      Swal.fire({
        title: "Der Kurs wurde erfolgreich erstellt!",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        clearForm()
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Es ist ein Fehler aufgetreten",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  useEffect(() => {
    setGotoPage("/courseaddpage")
 }, []);


return (
 <main id="courseAddForm">
    <div id="headBox">
        <h2 id="courseHead">Eingabe von neunen Kursangeboten</h2>
    </div>
    <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        id="courseSubmitForm"
    >
        <div>
          <label htmlFor="kursThema">Kursthema</label>
          <input
            type="text"
            id="kursThema"
            name="kursThema"
            value={kursThema}
            //placeholder="Kurstitel"
            onChange={(e) => {
              handleChange(e);
              setKursThema(e.target.value);
            }}
            />
        </div>
        <div>
          <label htmlFor="kursAutor"> Autorenliste</label>
            <input
            type= "text"
            id="kursAutor"
            name="kursAutor"
            value={kursAutor}
            placeholder="Gib Autoren ein"
            onChange={handleAuthorChange}
            />
            <ul>
            {kursAutor.map((author, index) => (
              <li key={index}>{author}</li>
            ))}
          </ul>
          </div>
        <div>
          <label htmlFor="kursTyp">Kurstyp:<sup id="courseTypeSup">*</sup></label>
            <input type= "text"
            id="kursTyp"
            name="kursTyp"
            value={kursTyp}
            //placeholder="kursTyp"
            onChange={(e) => {
              handleChange(e);
              setKursTyp(e.target.value);
            }} />
        </div>
        <div>
          <label htmlFor="themenfeld">Themenfeld:<sup id="topicFieldSup">*</sup></label>
            <input type= "text"
            id="themenfeld"
            name="themenfeld"
            value={themenfeld}
            //placeholder="Themenfeld"
            onChange={(e) => {
              handleChange(e);
              setThemenfeld(e.target.value);
            }} />
        </div>
        <div>
          <label htmlFor="kursInhalt">Kursinhalt:<sup id="kursInhaltSup">*</sup></label>
            <textarea 
            /* type= "text" */
            id="kursInhalt"
            name="kursInhalt"
            value={kursInhalt}
            //placeholder="Themenfeld"
            onChange={(e) => {
            handleChange(e);
            setKursInhalt(e.target.value);
            }} />
        </div>
        <div>
          <label htmlFor="professionalLevel">Level:<sup id="professionalLevelSup">*</sup></label>
            <input type= "text"
            id="professionalLevel"
            name="professionalLevel"
            value={professionalLevel}
            //placeholder="Themenfeld"
            onChange={(e) => {
            handleChange(e);
            setProfessionalLevel(e.target.value);
            }} />
        </div>
        <div>
          <label htmlFor="imageUpload">
            Foto hochladen:
          </label>
            <input
              type="file"
              name="imageUpload"
              id="imageUpload"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setRemoved(false);
              }}
            />
          {file ? (
            <>
              <div>
                <p>
                  <span id="file">{file.name}</span>
                  <CloseOutlined
                    onClick={() => {
                      setRemoved(true);
                      setFile(null);
                    }}
                  />
                </p>
                <label htmlFor="image">
                  Dateien durchsuchen
                </label>
              </div>
            </>
          ) : (
            <label htmlFor="image">
              Dateien durchsuchen
            </label>
          )}
        </div>
      <span>
          <input className="buttonBasics" type="submit" value="Erstellen" />
        </span>
    </form>
 </main>
)

}

export default CourseAddForm
