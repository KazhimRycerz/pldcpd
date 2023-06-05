import './AuthorsPage.scss'
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AuthorsPageMain from "../../components/AuthorsPageMain/AuthorsPageMain.jsx";
import AccountAside from "../../components/AccountAside/AccountAside.jsx";
import { useEffect, useContext } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";

const CoursePage = () => {
    
    return(
      <>
        <Header />
        <AccountAside />
        <AuthorsPageMain />
        <Footer />
      </>
    )
}

export default CoursePage;