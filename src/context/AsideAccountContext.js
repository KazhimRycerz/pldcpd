import React, { useState, useContext, createContext } from "react";

// 2. Account Positionen / Class handeln
const AsideAccountContext = React.createContext(null);

const AsideAccountProvider = (props) => {
  const [showAccount, setShowAccount] = useState("");

  return (
    <AsideAccountContext.Provider value={{ showAccount, setShowAccount }}>
      {props.children}
    </AsideAccountContext.Provider>
  );
};
export { AsideAccountContext, AsideAccountProvider };
