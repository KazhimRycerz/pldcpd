import React, { useState, useRef, useContext, useEffect } from "react";
import axiosConfig from "../../util/axiosConfig.js"
import { SectionsContext } from "../../context/SectionsContext.js";
import Swal from "sweetalert2";


const ListOfCourseTypes = () => {
const { isAuth } = useContext(SectionsContext);
const [typeList, setTypeList] = useState([])

  const getListOfCourseTypes = async () => {
    try {
      const response = await axiosConfig.get("/coursetypes");
      const receivedData = response.data;
      setTypeList(receivedData);
      //console.log(receivedData);
    } catch (error) {
      Swal.fire({
        title: "Keine Liste gefunden",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  }

  useEffect(() => {
    getListOfCourseTypes();
  }, []);

  return (
    <>   
        {typeList.map((typeList, index) => (
          <option key={index} value={typeList.type}>
            {typeList.type}
          </option>
        ))}
    </>   
  )
}

const ListOfLanguages = () => {
  const languageList = [
    "Deutsch",
    "Englisch",
    "Französisch",
    "Italienisch",
    "Spanisch",
    "Chinesisch"
  ];
    
  /* useEffect(() => {
      console.log(languageList)
    }) */
    return (
      <>   
          {languageList.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
      </>   
    )
  }

  const ListOfTopicFields = () => {
    const topicFieldList = [
      "Lichtdesign",
      "Lichttechnik",
      "Lichtkunst",
      "Planungspraxis",
      "Berufspraxis",
      "Masterplanung",
    ];
      
    /* useEffect(() => {
        console.log(languageList)
      }) */
      return (
        <>   
            {topicFieldList.map((topicField, index) => (
              <option key={index} value={topicField}>
                {topicField}
              </option>
            ))}
        </>   
      )
    }

    const ListOfLevel = () => {
      const levelList = [
        {
        value: 0,
        discription: "beginner"
        },
        {
        value: 1,
        discription: "student"
        },
        {
        value: 2,
        discription: "newly qualified Lighting designer"
        },
        {
        value: 3,
        discription: "junior lighting designer"
        },
        {
        value: 4,
        discription: "project lighting designer"
        },
        {
        value: 5,
        discription: "senior lighting designer"
        },
        {
        value: 6,
        discription: "associate lighting designer"
        },
        {
        value: 7,
        discription: "principal lighting designer"
        },
        {
        value: 8,
        discription: "master in lighting design"
        },
        {
        value: 9,
        discription: "authorised expert in lighting design"
        },
      ];
        
      /* useEffect(() => {
          console.log(levelList)
        }) */
        return (
          <>   
              {levelList.map((level, index) => (
                <option key={index} value={level.value}>
                  {level.discription}
                </option>
              ))}
          </>   
        )
      }


export { ListOfCourseTypes, ListOfLanguages, ListOfTopicFields, ListOfLevel }
