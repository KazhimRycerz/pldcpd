import React, { useState, useContext, createContext } from 'react'
import './AccountButtonContext.scss'

const AsideAccountButtonContext = React.createContext(null)

const AccountButtonProvider = (props)=>{
   const [buttonPos, setButtonPos] = useState("buttonPosition0");
   
   return (
      <AsideAccountButtonContext.Provider value={{buttonPos, setButtonPos}}>
         {props.children}
      </AsideAccountButtonContext.Provider>
   )
}
export { AsideAccountButtonContext, AccountButtonProvider }