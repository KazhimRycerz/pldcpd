import React, { useState, useContext, createContext } from 'react'
import './AccountButtonContext.scss'

const AsideAccountButtonContext = React.createContext(null)

const AccountButtonProvider = (props)=>{
   const buttonPosition0 = "buttonTestAccount"
   const buttonMove1 = "buttonTestAccount showTestBut" 
   const buttonMove2 = "buttonTestAccount showTestBut moveTestButtonback" 
   const buttonMove3 = "buttonTestAccount showTestBut moveTestButton" 
   const buttonMove4 = "buttonTestAccount hideTestBut" 
   const [buttonPos, setButtonPos] = useState({buttonPosition0});
   
   return (
      <AsideAccountButtonContext.Provider value={{buttonPos, setButtonPos}}>
         {props.children}
      </AsideAccountButtonContext.Provider>
   )
}
export { AsideAccountButtonContext, AccountButtonProvider }