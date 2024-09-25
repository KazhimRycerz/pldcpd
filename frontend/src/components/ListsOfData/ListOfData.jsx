import React, { useState, useContext, useEffect } from "react";
import axiosConfig from "../../util/axiosConfig.js"
import { SectionsContext } from "../../context/SectionsContext.js";
import Swal from "sweetalert2";
import { CloseOutlined } from "@ant-design/icons";


const DataListOfCourseTypes = () => {
  const { isAuth } = useContext(SectionsContext);
  const [typeList, setTypeList] = useState([])
  const getListOfCourseTypes = async () => {
    try {
      const response = await axiosConfig.get("/coursetypes");
      const receivedData = response.data;
      setTypeList(receivedData);
      //console.log(typeList);
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
  
const ListOfCourseTypes = ({ onSelectCourseType}) => {
  //const { isAuth } = useContext(SectionsContext);
  const [typeList, setTypeList] = useState([]);

  const getListOfCourseTypes = async () => {
    try {
      const response = await axiosConfig.get("/coursetypes");
      const receivedData = response.data;
      setTypeList(receivedData);
    console.log(typeList);
    } catch (error) {
      Swal.fire({
        title: "Keine Liste gefunden",
        icon: "error",
        confirmButtonText: "OK"
      });
    }
  };

  useEffect(() => {
    getListOfCourseTypes();
  }, []);

  return (
    <ul 
    id="listOfCourseTypes" 
    style={{ listStyleType: 'none', padding: 0 }}>
      
      {typeList.map((type, index) => (
        <li 
          key={index} 
          onClick={() => onSelectCourseType(type.type)} 
          style={{ cursor: 'pointer', padding: '5px', borderBottom: '1px solid #ddd' }}
        >
          {type.type}
        </li>
      ))}
    </ul>
  );
};


const ListOfCountryCodes = ({ onSelectCountryCode, handleCountryCodeFocus }) => {
  //const { isAuth } = useContext(SectionsContext);
  const [countryList, setCountryList] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredCountryList = countryList.filter(country =>
    country.landBezeichnung.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>   
      <ul id="countryCodeOptions">
        
          < CloseOutlined 
            id="closeX" 
            onClick={() => {
              handleCountryCodeFocus();
            }}
            />
       
        <input
        id="sucheCountryCode"
        type="text"
        placeholder="Land Suchfilter"
        value={searchTerm}
        onChange={handleSearch}
        autoFocus
        autoComplete="off"
        />
      {filteredCountryList.slice(0, 10).map((country, index) => (
        <li 
        key={index} 
        value={country.kurzCode} 
        onClick={() => onSelectCountryCode(country)}>
        {country.landBezeichnung}
        </li>
      ))}
      </ul>
    </>   
  )
}

const stepsOfCPDEvaluation = [
  "CPD listed", 
  "CPD started", 
  "CPD finished", 
  "Request for verification", 
  "CPD verified"
]

const ListOfLanguages = [
  "Deutsch",
  "Englisch",
  "Französisch",
  "Italienisch",
  "Spanisch",
  "Chinesisch",
  "Schwedisch"
];

const ListOfTopicFields = [
  "Lichtdesign",
  "Lichttechnik",
  "Tageslicht",
  "Masterplanung",
  "Lichtkunst",
  "Planungspraxis",
  "Berufspraxis",
  "Community"
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
    discription: "Lichttechnikbüro",
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
    kürzel:"IAB",
    discription: "Innenarchitekturbüro",
    discriptionEn: "interior architecture"
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
  },
  {
    kürzel:"ME",
    discription: "Medien",
    discriptionEn: "media"
  },
  {
    kürzel:"V",
    discription: "Verband",
    discriptionEn: "association"
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
  discription: "Beginner"
  },
  {
  value: 1,
  discription: "Student"
  },
  {
  value: 2,
  discription: "Newly qualified Lighting designer"
  },
  {
  value: 3,
  discription: "Junior lighting designer"
  },
  {
  value: 4,
  discription: "Project lighting designer"
  },
  {
  value: 5,
  discription: "Senior lighting designer"
  },
  {
  value: 6,
  discription: "Associate lighting designer"
  },
  {
  value: 7,
  discription: "Principal lighting designer"
  },
  {
  value: 8,
  discription: "Master in lighting design"
  },
  {
  value: 9,
  discription: "Authorised expert in lighting design"
  },
];
  
const ListOfAccessRights = () => {
  //const { isAuth } = useContext(SectionsContext);
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

export { IndustryField, ListOfCompanyType, ListOfCourseTypes, DataListOfCourseTypes, ListOfLanguages, ListOfTopicFields, stepsOfCPDEvaluation, ListOfLevel, ListOfAccessRights, ListOfCountryCodes }
