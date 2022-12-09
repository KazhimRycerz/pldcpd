import React, { useState, useContext, createContext } from 'react'
//import './AccountButtonContext.scss'


// 1. Button Positionen / Class handeln
const AsideAccountButtonContext = React.createContext(null)

const AccountButtonProvider = (props)=>{

   /* const buttonPosition0 = "buttonAccount"
   const buttonMove1 = "buttonAccount showBut" 
   const buttonMove2 = "buttonAccount showBut moveButton" 
   const buttonMove3 = "buttonAccount showBut moveButtonBack" 
   const buttonMove4 = "buttonAccount hideBut"  */

   const [buttonPos, setButtonPos] = useState("buttonAccount");
   
   return (
      <AsideAccountButtonContext.Provider value={{buttonPos, setButtonPos}}>
         {props.children}
      </AsideAccountButtonContext.Provider>
   )
}
export { AsideAccountButtonContext, AccountButtonProvider }


// 2. Account Positionen / Class handeln
/* const AsideAccountContext = React.createContext(null)

const AsideAccountProvider = (props)=>{
   const [showAccount, setShowAccount] = useState("hideAccount")
   
   return (
      <AsideAccountButtonContext.Provider value={{showAccount, setShowAccount}}>
         {props.children}
      </AsideAccountButtonContext.Provider>
   )
}
export { AsideAccountContext, AsideAccountProvider } */