import { Link } from "react-router-dom";
import "./ImpressumMain.scss";
import { useContext, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";


const ImpressumMain = () => {

    const { gotoPage, setGotoPage, navigate } = useContext(SectionsContext);

  return (
    <main id="impressumMain">
       <div className="headBox">
       <h2> Impressum</h2>
        <p className="closingFunction" onClick={() => navigate(-1)}>Impressum schließen</p>
        </div>   
       <div id="impressum">
         <div>
            <h3>Verlag</h3>
            <p>Rycerz Media GmbH</p>
            <p>Marienfelder Str. 18</p>
            <p>33330 Gütersloh</p>
            <p>Germany</p>
            <p>e-mail: info@via-internet.com</p>
            <p>+49-170-2046812</p>
         </div>
         <div>
           <h3>Unternehmensdaten</h3>
           <p>Steuer.-Nr.: 351/???/????</p>
           <p>UID: ???????????</p>
         </div>
         <div>
           <h3>Bankverbindung</h3>
           <p>Rycerz Media</p>
           <p>Deutsche Bank</p>
           <p>IBAN: ???????????</p>
           <p>SWIFT: ???????????</p>
         </div>
          
       </div>
        
    </main>
  );
}

export default ImpressumMain;
