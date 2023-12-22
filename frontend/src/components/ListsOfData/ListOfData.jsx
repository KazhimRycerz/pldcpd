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

/* const ListOfCountryCodes = () => {
const [filteredData, setFilteredData] = useState([]);
const [filterValue, setFilterValue] = useState('');

useEffect(() => {
  const getList = async () => {
    try {
      if (filterValue.trim() === '') {
        // Wenn kein Filterwert vorhanden ist, alle Daten abrufen
        const response = await axiosConfig.get(`/countrycodes`);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const receivedData = response.data;
        setFilteredData(receivedData);
      } else {
        // Wenn ein Filterwert vorhanden ist, nur gefilterte Daten abrufen
        const response = await axiosConfig.get(`/countrycodes?filter=${filterValue}`);
        if (response.status !== 200) {
          throw new Error('Network response was not ok');
        }
        const filteredData = response.data;
        setFilteredData(filteredData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  getList();
}, [filterValue]);

return (
  <>
    <input
      type="text"
      placeholder="Filter by Country"
      value={filterValue}
      onChange={e => setFilterValue(e.target.value)}
    />
    <datalist id="countryCodeOptions">
      {filteredData.map((countryList, index) => (
        <option key={index} value={countryList.kurzCode}>
          {countryList.landBezeichnung}
        </option>
      ))}
    </datalist>
  </>
);
}; */

const ListOfCountryCodes = () => {
  //const { isAuth } = useContext(SectionsContext);
  const [countryList, setCountryList] = useState([])

  const getListOfCountryCodes = async () => {
    try {
      const response = await axiosConfig.get("/countrycodes");
      const receivedData = response.data;
      setCountryList(receivedData);
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
    getListOfCountryCodes();
  }, []);

  return (
    <>   
      <datalist id="countryCodeOptions">
        {countryList.map((country, index) => (
          <option key={index} value={countryList.kurzCode}>
            {country.landBezeichnung}
          </option>
        ))}
      </datalist>
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

const ListOfCompanyType = [
  {
    kürzel:"H",
    discription: "Industrie",
    discriptionEn: "manufacturer" 
  },
  {
    kürzel:"LD",
    discription: "Lichtdesignbüro",
    discriptionEn: "lighting design practise"
  },
  {
    kürzel:"LT",
    discription: "Lichtdesignbüro",
    discriptionEn: "lighting design practise"
  },
  {
    kürzel:"LK",
    discription: "Lichtkünstler",
    discriptionEn: "lighting artist"
  },
  {
    kürzel:"AB",
    discription: "Architekturbüro",
    discriptionEn: "architectural practise"
  },
  {
    kürzel:"HS",
    discription: "Hochschule",
    discriptionEn: "university"
  },
  {
    kürzel:"PA",
    discription: "Privatadresse",
    discriptionEn: "private address"
  }
]

const IndustryField= [
  {
    value: 1,
    brancheDe: "Bau",
    brancheEn: "construction"
  },
  {
    value: 2,
    brancheDe: "Licht",
    brancheEn: "lighting"
  },
  {
    value: 3,
    brancheDe: "Event",
    brancheEn: "event"
  },
  {
    value: 4,
    brancheDe: "Medien",
    brancheEn: "media"
  },
  {
    value: 5,
    brancheDe: "Immobilien",
    brancheEn: "real estate"
  }

]

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

export { IndustryField, ListOfCompanyType, ListOfCourseTypes, ListOfLanguages, ListOfTopicFields, ListOfLevel, ListOfAccessRights, ListOfCountryCodes }
