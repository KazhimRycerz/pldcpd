import "./KnowledgeAccount.scss";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import KnowledgeAccountMain from "../../components/KnowledgeAccountMain/KnowledgeAccountMain.jsx";
import AccountAside from "../../components/AccountInfoAside/AccountInfoAside.jsx";
//import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";

const KnowledgeAccount = () => {
  const { isAuth, navigate } = useContext(SectionsContext);
  !isAuth && navigate("/login")  

  return (
    <>
      <Header />
      <AccountAside />
      <KnowledgeAccountMain />
      <Footer />
    </>
  );
};

export default KnowledgeAccount;