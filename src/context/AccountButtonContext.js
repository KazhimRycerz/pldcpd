import { useState, createContext } from 'react'


const buttonPosition = {
   position0: {
      display: "none",
      position: "fixed",
      top: "155px",
      right:"calc(10% - 10px)",
      transform: "translateY(30px) rotate(-90deg)", 
      color: "$cpdblue",
      backgroundColor: "$button-color",
      boxShadow: "$btnshadow",
      width: "65px",
      height: "40px",
      border: "1px solid grey",
      borderRadius: "10px",
      textAlign:"center",
      zIndex: 0
   },
   position1: {
      right:"calc(10% - 33px)",
      transition: "0.5s ease-in-out"
   },
    /* position2: {
      @keyframes //moveButton 
       {
         0% {
            transform: "rotate(0deg)",
            zIndex: 10,
            right: "33px"
         }
         50% {
            zIndex: 0
         }
         100% {
            transform: "translateY(30px) rotate(-90deg)",
            zIndex:0,
            right:"calc(10% - 33px)"
         }
       }
   },
   position3: {
      @keyframes //moveButtonback 
       {
         0%  {
            transform:  "translateY(30px) rotate(-90deg)",
            zIndex:0,
            right:"calc(10% - 33px)"
         }
         90% {
            zIndex: 0
         }
         100% {
            transform:  "rotate(0deg)",
            zIndex: 10,
            right: "30px"
         }
       }
   } */
}

export const AccountButtonContext = createContext (buttonPosition.position0)

export const AccountButtonProvider =()=>{

   <button type="button" class="buttonShowAccount hideBut" id="testbutton">testbutton</button>

}
