import React, { useState, useRef, useContext, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
import Swal from "sweetalert2";


const FehlendeZugangsrechte = () => {
Swal.fire({
   icon: "error",
   title: "Dir fehlen die Zugangsrechte für die gewählte Seite. Wende dich an den Admin, um Zugangsrechte zu erhalten!",
   confirmButtonText: "OK",
   timer: 6000
 })
}

const RegistriertenRechte = () => {
  
  const { isAuth, gotoPage, setGotoPage, navigate } = useContext(SectionsContext);
  const [showMenue, setShowMenue] = useState(false);
Swal.fire({
  title: 'Du musst registriert und angemeldet sein, um deinen Account sehen zu können.',
  //text: 'Hinweis',
  icon: 'info',
  showCancelButton: true,
  confirmButtonText: 'Ja, bitte einloggen!',
  cancelButtonText: 'Nein, zurück zur Hauptseite'
}).then((result) => {
  if (result.isConfirmed) {
    navigate('/login');
  } else if (result.isDismissed) {
    setShowMenue(!showMenue);
    navigate('/home');
  } else {
    Swal.fire('Got away safely!', '', 'success');
  }
});
}



export { FehlendeZugangsrechte, RegistriertenRechte }