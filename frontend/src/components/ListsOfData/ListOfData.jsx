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

  const ListOfLanguages = [
    "Deutsch",
    "Englisch",
    "Französisch",
    "Italienisch",
    "Spanisch",
    "Chinesisch"
  ];
  

  const ListOfTopicFields = [
    "Lichtdesign",
    "Lichttechnik",
    "Lichtkunst",
    "Planungspraxis",
    "Berufspraxis",
    "Masterplanung",
    "Community",
  ];

  const ListOfLevel = [
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
    
  const ListOfAccessRights = () => {
    const { isAuth } = useContext(SectionsContext);
    const [accessList, setAccessList] = useState([])
    
      const getListOfAccessRights = async () => {
        try {
          const response = await axiosConfig.get("/accessrights");
          const receivedData = response.data;
          setAccessList(receivedData);
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
        getListOfAccessRights();
      }, []);
    
      return (
        <>   
            {accessList.map((list, index) => (
              <option key={index} value={list.type}>
                {list.type}
              </option>
            ))}
        </>   
      )
    }


export { ListOfCourseTypes, ListOfLanguages, ListOfTopicFields, ListOfLevel, ListOfAccessRights }
