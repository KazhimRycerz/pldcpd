import React, { useState, createContext } from 'react'

const SectionsContext = createContext();
const SectionsProvider = ({ children }) => {

   const [buttonPos, setButtonPos] = useState("");
   const [showAccount, setShowAccount] = useState("");
   const [loggedIn, setLoggedIn] = useState(false);
  

  return (
    <SectionsContext.Provider
      value={{
         buttonPos, 
         setButtonPos,
         showAccount, 
         setShowAccount,
         loggedIn, 
         setLoggedIn
      }}
    >
      {children}
    </SectionsContext.Provider>
  );
};

export { SectionsContext, SectionsProvider };

