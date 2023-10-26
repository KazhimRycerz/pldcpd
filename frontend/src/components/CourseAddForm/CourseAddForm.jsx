import React, { useState, useRef, useContext, useEffect } from "react";
import axiosConfig from "../../util/axiosConfig.js";
import { SectionsContext } from "../../context/SectionsContext.js";
import "./CourseAddForm.scss";
import { CloseOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
//import swal from "sweetalert";

const CourseAddForm = () => {
  const { isAuth, setGotoPage } = useContext(SectionsContext);

const [file, setFile] = useState(null);
const [removed, setRemoved] = useState(false);
const [kursThema, setKursThema] = useState("");
const [kursAutor, setKursAutor] = useState([]);
const [themenfeld, setThemenfeld] = useState("");
const [kursTyp, setKursTyp] = useState("");
const [kursInhalt, setKursInhalt] = useState("");
const [professionalLevel, setProfessionalLevel] = useState("");
const [kursSprache, setKursSprache] = useState([]);
const [cpdPoints, setCPDPoints] = useState(0);
const [additionalCPDPoints, setAdditionalCPDPoints] = useState(0);
const [linkProvider, setLinkProvider] = useState("");
const [kursstart, setKursstart] = useState("");
const [kursende, setKursende] = useState("");
//const [eventDescription, setDescription] = useState("");
const [listOfAuthors, setListOfAuthors] = useState([]);
const [kursActivated, setKursActivated] = useState(false);
const [formErrors, setFormErrors] = useState({});
const [data, setData] = useState([])
const [filter, setFilter] = useState('');
const { navigate } = useContext(SectionsContext);

const clearForm = () => {
  setFile(null);
  setKursThema("");
  setKursAutor([]);
  setThemenfeld("");
  setKursTyp("");
  setKursInhalt("");
  setProfessionalLevel("");
  setKursSprache([]);
  setCPDPoints(0);
  setAdditionalCPDPoints(0);
  setLinkProvider("");
  setKursstart("");
  setKursende("");
  //setDescription("");
  setKursActivated(false)
}

const resizeHandler = (e)=> {
  // Reset field height
  e.target.style.height = 'inherit';
  // Get the computed styles for the element
  const computed = window.getComputedStyle(e.target);
  // Calculate the height
  const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
  + parseInt(computed.getPropertyValue('padding-top'), 10)
  + e.target.scrollHeight
  + parseInt(computed.getPropertyValue('padding-bottom'), 10)
  + parseInt(computed.getPropertyValue('border-bottom-width'), 10);
  e.target.style.height = `${height}px`;
}


const handleChangeOfData = (event) => {
  const { value, checked } = event.target;
  /* const { categories } = eventCategory;
  if (checked) {
    setEventCategory({ categories: [...categories, value] });
  } else {
    setEventCategory({ categories: categories.filter((e) => e !== value) });
  } */
};

const handleFilter = (e) => {
  const inputValue = e.target.value;
  setFilter(inputValue);
}; 

const authorsFilter = (input) => {
  return listOfAuthors.filter((author) =>
    author.Name.toLowerCase().includes(input.toLowerCase())
  );
};

const updateAuthorsList = (e) => {
  // Hier kannst du den Wert aus dem Eingabefeld hinzufügen oder entfernen
  console.log(kursAutor)
  const selectedAuthor = e.target.value;
  if (!kursAutor.includes(selectedAuthor) && selectedAuthor !=="") {
    setKursAutor([...kursAutor, selectedAuthor])
  } else {
    const updatedAuthors = kursAutor.filter((author) => author !== selectedAuthor);
    setKursAutor(updatedAuthors); // Entfernen des Autors aus dem Array
  }
    //e.target.value = "";
    console.log(kursAutor)
};

const authorsAvailableList = async () => {
  try {
    const response = await axiosConfig.get("/contacts");
    //console.log("responseData", response.data);
    const receivedData = response.data;
    // Filtere die Daten, um nur Einträge mit "authorsData" zu erhalten
    const filteredData = receivedData.filter(entry => entry.authorsData);
    // Erstelle ein Array von Objekten mit _id und Name
    const authorsArray = filteredData.map(entry => ({
      _id: entry._id,
      Name: `${entry.lastName}, ${entry.firstName} `
    }));
    //authorsArray.Name.includes(filter)
    authorsArray.sort((a, b) => {
      const nameA = a.Name.toLowerCase();
      const nameB = b.Name.toLowerCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    setListOfAuthors(authorsArray);
  } catch (error) {
    !listOfAuthors && Swal.fire({
      title: "Keine Autoren gefunden",
      icon: "error",
      confirmButtonText: "OK"
    });
  }
}

const updateLanguageList = (e) => {
  // Hier kannst du den Wert aus dem Eingabefeld hinzufügen oder entfernen
  console.log(kursSprache)
  const addLanguage = e.target.value;
  if (!kursSprache.includes(addLanguage)) {
    setKursSprache([...kursSprache, addLanguage]);
    // Hinzufügen der Sprache zum Array
  } else {
    const updatedSprache = kursSprache.filter((sprache) => sprache !== addLanguage);// Entfernen des Autors aus dem Array
    setKursSprache(updatedSprache);
  }
    e.target.value = "";
    console.log(kursSprache)
};

  const validateForm = () => {
    const errors = [];
    // Validierung für das Kurs-Thema
    if (kursThema.trim() === "") {
      errors.push("Das Kursthema darf nicht leer sein");
    }
    if (kursAutor.length === 0) {
      errors.push("Es wurde noch kein Referent ausgewählt");
    }
    if (kursTyp.trim() === "") {
      errors.push("Das Feld Kurstyp darf nicht leer sein");
    }
    if (themenfeld.trim() === "") {
      errors.push("Das Feld Themenkategorie darf nicht leer sein");
    }
    if (kursInhalt === "") {
      errors.push("Bitte eine Beschreibung des Themas und der Inhalte eingeben");
    }
    if (kursInhalt.length > 500) {
      const überlänge = kursInhalt.length - 500;
      errors.push(`Die Beschreibung ist zu lang. Sie darf nur 500 Zeichen umfassen. Kürzen Sie um ${überlänge} Zeichen`);
    }
    if (kursSprache.length === 0) {
      errors.push("Es wurde noch kein Sprache ausgewählt");
    }
    if (professionalLevel === "" || isNaN(professionalLevel) || professionalLevel < 1 || professionalLevel > 9) {
      errors.push("Bitte den professionellen Kurslevel zwischen 1 und 9 eingeben.");
    }
    /* const dateOfToday = new Date();
    if (new Date(kursstart) < dateOfToday) {
      errors.push("Der Kursstart liegt in der Vergangenheit.");
    } */
    if (new Date(kursstart) > new Date(kursende)) {
      errors.push("Der Kursstart liegt hinter dem Kursende.");
    }

    if (errors.length > 6) {
      Swal.fire({
        title: "Bitte zunächst Daten eingeben",
        icon: "error",
        confirmButtonText: "OK"
      });
      return false; // Die Validierung ist fehlgeschlagen
    }

    if (errors.length > 0) {
      Swal.fire({
        title: "Fehler bei der Formularvalidierung. Folgende Eingaben fehlen oder sind fehlerhaft:",
        icon: "error",
        html: errors.join("<br>"),
        confirmButtonText: "OK"
      });
      return false; // Die Validierung ist fehlgeschlagen
    }
    
    return true; // Die Validierung ist erfolgreich
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (isValid) {
      // Führe die Aktionen aus, wenn das Formular gültig ist
      // ...
      
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
      startDateOfCourse: kursstart,
      endDateOfCourse: kursende,
      linkToProvider: linkProvider,
      active: kursActivated,
      updatedBy: localStorage.getItem("userId"),
      /*time: eventTime,
      location: JSON.stringify(eventLocation),
      participants: eventParticipants,
      price: eventPrice,
      description: eventDescription, */
    };
    
    
    try {
      const response = await axiosConfig.post("/courses", courseData,
      /* {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      } */
      );
      console.log("reponsData", response.data);
      Swal.fire({
        title: "Das Kursangebot wurde erfolgreich erstellt!",
        text: "Was willst du als nächstes tun?",
        icon: "success",
        showConfirmButton: true,
        showCancelButton: true,
        showDenyButton: true,
        confirmButtonText: 'Neuer Datensatz',
        cancelButtonText: 'Datensatz anzeigen',
        denyButtonText: 'Formular schließen',
      }).then((result) => {
        if (result.isConfirmed) {
          clearForm()
        } else if (result.isDismissed) {
          clearForm()
        } else if (result.isDenied) {
          navigate("/home")
        }
      })
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Es ist ein Fehler aufgetreten. Der datensatz wurde nicht gespeichert.",
          icon: "error",
          confirmButtonText: "OK"
        });
      }
    }
  };

  useEffect(() => {
    setGotoPage("/courseaddpage")
    authorsAvailableList()
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
          <label htmlFor="kursThema">Kursthema<sup id="kursThemaSup">*</sup></label>
          <input
            type="text"
            id="kursThema"
            name="kursThema"
            value={kursThema}
            placeholder="Wie lautet das Thema?"
            autocomplete="off"
            autofocus
            onChange={(e) => {
              setFormErrors({ ...formErrors, kursThema: "" }); // Fehlermeldung zurücksetzen
            handleChangeOfData(e);
            setKursThema(e.target.value);
          }}
            />
            {formErrors.kursThema && <p className="error">{formErrors.kursThema}</p>}
        </div>
        
        {/* <div id="autorenauswahl">
          <div>
            <label htmlFor="kursAutor"> Autorensuche</label>
            <input type="text" name="sucheAutor" value={filter}
            onChange={handleFilter} id="sucheAutor" placeholder="Suchfilter" multiple /> 
          </div>             
          <div>
            <input 
            name="kursAutor" 
            onClick={updateAuthorsList}
            id="kursAutor" multiple 
            list="autorenwahl" >
            </input>  
            <datalist id="autorenwahl">
            {authorsFilter(filter).map((item, index) => (
                <option key={index} value={item._id}>{item.Name}</option>
              ))}
            </datalist>

            {kursAutor.length >= 1 ? (
            <ul id="authorsAvailableListToSave">
              {kursAutor.map((authorId, index) => (
                <li key={index} value={authorId}>
                  {listOfAuthors.find(author => author._id === authorId)?.Name}
                </li>
              ))}
            </ul>
            ) : (
              <ul id="authorsAvailableListToSave">
                <li>Auswahl ist leer</li>
              </ul>
            )}
          </div>
        </div> */}
        <div id="autorenauswahl">
          <div>
            <label htmlFor="kursAutor" id="autorenSucheLabel"> Autoren<sup id="autorenSucheSup">*</sup></label>
            <input 
            type="text" 
            name="sucheAutor" 
            value={filter}
            onChange={handleFilter} 
            id="sucheAutor" 
            placeholder="Suchfilter" 
            autocomplete="off"
            multiple /> 
          </div>             
          <div>
            <select name="kursAutor" onClick={updateAuthorsList}id="kursAutor" multiple> 
              {authorsFilter(filter).map((item, index) => (
                <option key={index} value={item._id}>{item.Name}</option>
              ))} 
            </select>  

            {kursAutor.length >= 1 ? (
            <ul id="authorsAvailableListToSave">
              {kursAutor.map((authorId, index) => (
                <li key={index} value={authorId}>
                  {listOfAuthors.find(author => author._id === authorId)?.Name}
                </li>
              ))}
            </ul>
            ) : (
              <ul id="authorsAvailableListToSave">
                <li>Auswahl ist leer</li>
              </ul>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="kursTyp">Kurstyp:<sup id="courseTypeSup">*</sup></label>
          <input type= "text"
          id="kursTyp"
          name="kursTyp"
          list="AuswahlKurstyp"
          value={kursTyp}
          placeholder="Kurstyp aussuchen"
          autocomplete="off"
          onChange={(e) => {
            handleChangeOfData(e);
            setKursTyp(e.target.value);
          }} 
          />
          <datalist id="AuswahlKurstyp">
          <option></option>
          <option>Fachartikel</option>
          <option>Fachbuch</option>
          <option>LifeSeminar</option>
          <option>OnlineSeminar</option>
          <option>Workshop</option>
          </datalist>
        </div>
        <div>
          <label htmlFor="themenfeld">Themenfeld:<sup id="topicFieldSup">*</sup></label>
          <input type= "text"
          id="themenfeld"
          name="themenfeld"
          value={themenfeld}
          list="auswahlThemenfeld"
          placeholder="Themenfeld aussuchen"
          autocomplete="off"
          onChange={(e) => {
            handleChangeOfData(e);
            setThemenfeld(e.target.value);
          }} 
          />
          <datalist id="auswahlThemenfeld">
            <option>Lichtdesign</option>
            <option>Lichttechnik</option>
            <option>Büropraxis</option>
            <option>Planungspraxis</option>
            <option>Masterplanung</option>
            <option>Berufspraxis</option>
            </datalist>
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
            handleChangeOfData(e);
            resizeHandler(e)
            setKursInhalt(e.target.value);
            }} />
        </div>
        <div id="sprachauswahl">
          
            <label htmlFor="kursSprache">Sprache:<sup    id="kursSpracheSup">*</sup></label>
            <div>
              <input 
              list="sprachOptionen"
              name="kursSprache" 
              onChange={updateLanguageList}
              id="kursSprache" 
              placeholder={kursSprache.length > 0 ? "Sprachen ergänzen oder löschen" : "Sprache auswählen"}
              multiple>
              </input>
              <datalist id="sprachOptionen">
                <option value="Deutsch"> Deutsch </option>
                <option value="Englisch"> Englisch </option>
                <option value="Französisch"> Französisch </option>
                <option value="Italienisch"> Italienisch </option>
                <option value="Spanisch"> Spanisch </option>
                <option value="Chinesisch"> Chinesisch </option>
              </datalist>
              {kursSprache.length >= 1 ? (
              <ul id="sprachListToSave">
              {kursSprache.map((language, index) => (
                <li key={index} value={language}>
                  {language}
                </li>
              ))}
            </ul>
              ) : (
                <ul id="sprachListToSave">
                  <li>Auswahl ist leer</li>
                </ul>
              )}
            </div>
        </div>
        {/* <div id="sprachauswahl">
          <div>
            <label htmlFor="kursSprache">Sprache:<sup    id="kursSpracheSup">*</sup></label>
          </div>            
            <div>
              <select name="kursSprache" onClick={updateLanguageList}id="kursSprache" multiple> 
                  <option value="Deutsch"> Deutsch </option>
                  <option value="Englisch"> Englisch </option>
                  <option value="Französisch"> Französisch </option>
                  <option value="Italienisch"> Italienisch </option>
                  <option value="Spanisch"> Spanisch </option>
                  <option value="Chinesisch"> Chinesisch </option> 
              </select>
              {kursSprache.length >= 1 ? (
              <ul id="sprachListToSave">
                {kursSprache.map((kursSprache, index) => (
                  <li key={index} value={kursSprache}>
                    {kursSprache}
                  </li>
                ))}
              </ul>
              ) : (
                <ul id="sprachListToSave">
                  <li>Auswahl ist leer</li>
                </ul>
              )}
            </div>
        </div> */}
        <div>
          <label htmlFor="professionalLevel">Level:<sup id="professionalLevelSup">*</sup></label>
          <input type= "text"
          id="professionalLevel"
          name="professionalLevel"
          value={professionalLevel}
          list="levelOptionen"
          placeholder="professional Level eingeben"
          onChange={(e) => {
          handleChangeOfData(e);
          setProfessionalLevel(e.target.value);
          }} 
          />
          <datalist id="levelOptionen">
            <option value="0"> beginner </option>
            <option value="1"> student </option>
            <option value="2"> newlyqualified Lighting designer </option>
            <option value="3"> junior lighting designer </option>
            <option value="4"> project lighting designer </option>
            <option value="5"> senior lighting designer </option>
            <option value="6"> associate lighting designr </option>
            <option value="7"> principal lighting designer </option>
            <option value="8"> master in lighting design </option>
            <option value="9"> authorised lexpert in ighting design </option>
          </datalist>
        </div>
        <div>
          <label htmlFor="cpdBasicPoints">CPDPoints:<sup id="cpdBasicPointsSup">*</sup></label>
          <input type= "number"
          id="cpdBasicPoints"
          name="cpdBasicPoints"
          value={cpdPoints}
          //placeholder="Themenfeld"
          onChange={(e) => {
          handleChangeOfData(e);
          setCPDPoints(e.target.value);
          }} />
        </div>
        <div>
          <label htmlFor="cpdAdditionalPoints">Bonus CPDPoints:<sup id="cpdAdditionalPointsSup">*</sup></label>
          <input type= "number"
          id="cpdAdditionalPoints"
          name="cpdAdditionalPoints"
          value={additionalCPDPoints}
          //placeholder="Themenfeld"
          onChange={(e) => {
          handleChangeOfData(e);
          setAdditionalCPDPoints(e.target.value);
          }} />
        </div>
        <div>
          <label htmlFor="kursstart">Kursstart:<sup id="kursstartSup">*</sup></label>
          <input type= "date"
          id="kursstart"
          name="kursstart"
          value={kursstart}
          //placeholder="Themenfeld"
          onChange={(e) => {
          handleChangeOfData(e);
          setKursstart(e.target.value);
          }} />
        </div>
        <div>
          <label htmlFor="kursende">Kursende:<sup id="kursendeSup">*</sup></label>
          <input type= "date"
          id="kursende"
          name="kursende"
          value={kursende}
          //placeholder="Themenfeld"
          onChange={(e) => {
          handleChangeOfData(e);
          setKursende(e.target.value);
          }} />
        </div>
        <div>
          <label htmlFor="linkProvider">Anbieter:<sup id="linkProviderSup">*</sup></label>
            <input type= "url"
            id="linkProvider"
            name="linkProvider"
            value={linkProvider}
            //placeholder="Themenfeld"
            onChange={(e) => {
            handleChangeOfData(e);
            setLinkProvider(e.target.value);
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
                {/* <label htmlFor="image">
                  Dateien durchsuchen
                </label> */}
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <label htmlFor="kursActivated">Kurs aktivieren:<sup id="activeSup">*</sup></label>
          <input type= "checkbox"
          id="kursActivated"
          name="kursActivated"
          checked={kursActivated}
          //placeholder="Themenfeld"
          onChange={(e) => {
          handleChangeOfData(e);
          setKursActivated(e.target.checked);
          }} 
          />
        </div>
      <div  id="buttonBox">
        <input className="buttonBasics" type="submit" /* value="Erstellen" */ />
        <input className="buttonBasics" type="reset" onClick={clearForm}/>
      </div>
    </form>
  </main>
  )
}

export default CourseAddForm
