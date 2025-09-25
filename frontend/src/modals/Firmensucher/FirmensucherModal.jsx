import React, { useState, useContext, useRef, useEffect, useCallback } from 'react';
import { Button } from 'antd';
import axiosConfig from "../../util/axiosConfig.js";
import Modal from 'react-modal';
import Swal from "sweetalert2";
import "./FirmensucherModal.scss";
import { CloseOutlined, EditOutlined, SaveOutlined, StepBackwardOutlined, StepForwardOutlined, StopOutlined, UploadOutlined  } from "@ant-design/icons";
import { SectionsContext } from "../../context/SectionsContext.js";

Modal.setAppElement('#root');

const FirmensucherModal = ({ 
   isOpen, 
   onRequestClose
   }) => {


   const { contactData, isAuth, accessRights, navigate, userMode, setUserMode } = useContext(SectionsContext);
   const [data, setData] = useState([null])
   const [firmenFilter, setFirmenFilter] = useState('')
   const [firmenListe, setFirmenListe] = useState([])
   const [statusSicherung, setStatusSicherung] = useState("gesichert")
   const [isModalVisible, setIsModalVisible] = useState(false);
   const [currentPage, setCurrentPage] = useState(1);
   const [itemsPerPage, setItemsPerPage] = useState(10)
   
   const handleItemsPerPageChange = (event) => {
      setItemsPerPage(parseInt(event.target.value, 10));
      setCurrentPage(1); // Zurücksetzen auf die erste Seite bei Änderung der Items pro Seite
   };
   const totalItems = firmenListe.length;
   const itemsPerPageValue = itemsPerPage === 0 ? totalItems : itemsPerPage; // Wenn "alle" ausgewählt ist
   const totalPages = Math.ceil(totalItems / itemsPerPageValue);
   const startIndex = (currentPage - 1) * itemsPerPageValue;
   const endIndex = Math.min(startIndex + itemsPerPageValue, totalItems);
   const currentItems = firmenListe.slice(startIndex, endIndex);
   const placeholders = Array(itemsPerPageValue - currentItems.length).fill(null);
  
   

   const handleCancelFirmensucher = () => {
    setIsModalVisible(false);
    setFirmenFilter("")
  };

//   const getCompanyToReview = async (e) => {
//     //console.log(e.target.value);
//     const selectedValue = e.target.value;
//     if (selectedValue === "") {
//       setData([null]);
//       return // Abbrechen, wenn "bitte auswählen" gewählt wird
//     }
//     try {
//       const companyId = e.target.value
//       const response = await axiosConfig.get(`/companies/${companyId}`);
//       const receivedData = await response.data;
//       //receivedData && displayCompany(receivedData)
//       setCompanyId(receivedData._id)
//     } catch (error) {
//       Swal.fire({
//         title: "Fehler beim Aufrufen der Firma",
//         icon: "error",
//         confirmButtonText: "OK"
//       });
//     }
//   };


   return (
      <Modal id="firmenSucherModal"
            title="Firma finden"
            open={isModalVisible}
            onCancel={handleCancelFirmensucher}
            className="modal" 
            overlayClassName="overlay"
            footer={
              <Button 
              key="back" 
              className="buttonBasics pFunction "
              id="backButtonFirmaFinden"
              onClick={handleCancelFirmensucher}>
                abbrechen
              </Button>
            }
            >
            <div id="firmenSucher">
              <div id="boxFirmensuche">
                <label 
                htmlFor="sucheFirma" 
                id="themenFilterLabel"
                > Firmenfilter
                </label>
                <input 
                type="text" 
                name="sucheFirma" 
                id="sucheFirma" 
                placeholder="Text-Filter" 
                autoComplete="off"
                value={firmenFilter}
                onDoubleClickCapture={(e) => 
                  {setFirmenFilter("")}}
                /* onChange={handleFilter} */ 
                onChange={(e) =>
                  {setFirmenFilter(e.target.value)}} 
                //autoComplete="off"
                />
              </div>

              <ul id="firmenListe"
            style={{listStyleType: "none", width:"100%"}}>
              {firmenListe.length > 0 ? (
                <>
                  <li
                  onClick={() => {
                    //getCompanyToReview({ target: { value: "" } });
                    setStatusSicherung("gesichert");
                    setIsModalVisible(false);
                  }}
                  value="no data"
                  >
                    bitte auswählen / Formular leeren 
                  </li>
                  {currentItems.map((item, index) => (
                    <li key={index}
                    onClick={() => {
                      //getCompanyToReview({ target: { value: item._id } });
                      setStatusSicherung("gesichert");
                      setIsModalVisible(false);
                    }}
                    value={item._id}
                    >
                      {item.Firma}
                    </li>
                  ))}
                  {placeholders.map((_, index) => (
                    <li key={`placeholder-${index}`} className="placeholder">
                        {/* Leerer Platzhalter */}
                    </li>
                ))}
                  <div>
                      <p>gefundene Adressen: {totalItems}</p>
                    <p>Seite {currentPage} von {totalPages}</p>
                    {/* <p>gefilterte Firmen: {currentItems.length} von {totalItems} insgesamt</p> */}
                    <p>Adresse {startIndex+1} bis  {endIndex}</p> 
                  </div>
                  <div id="listeFooter">
                    <label
                    htmlFor="itemsPerPage">
                      Adressen pro Seite:
                    </label>
                    <select 
                    id="itemsPerPage"
                    value={itemsPerPage} 
                    onChange={handleItemsPerPageChange}>
                    {[5, 10, 15, 20, 0].map((num) => (
                            <option key={num} value={num}>
                                {num === 0 ? "alle" : num}
                            </option>
                        ))}
                    </select>
                    <div id="movePages">
                        <StepBackwardOutlined 
                            onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                            disabled={currentPage === 1}
                        >  
                        </StepBackwardOutlined>
                        <StepForwardOutlined 
                            onClick={() => setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                        </StepForwardOutlined>
                    </div>
                  </div>
                </>
                
              ) : (
                <li
                  value="no data"
                >
                kein Treffer - bitte Filter verändern 
                </li>
              )}
            </ul>
            </div> 
          </Modal>
     );
   }
   
   export default FirmensucherModal  ;