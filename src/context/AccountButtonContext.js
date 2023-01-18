import React, { useState, useContext, createContext } from 'react'

// 1. Button Positionen / Class handeln
const AsideAccountButtonContext = React.createContext(null)

const AccountButtonProvider = (props)=>{

   const [buttonPos, setButtonPos] = useState("");
   
   return (
      <AsideAccountButtonContext.Provider value={{buttonPos, setButtonPos}}>
         {props.children}
      </AsideAccountButtonContext.Provider>
   )
}
export { AsideAccountButtonContext, AccountButtonProvider }
