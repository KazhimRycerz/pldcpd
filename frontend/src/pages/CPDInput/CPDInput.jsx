//import { NavLink } from 'react-router-dom'
import Header from "../../components/Header/Header.jsx";
import CPDInput from "../../components/CompanyForm/CompanyForm.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import AccountAside from "../../components/AccountAside/AccountAside.jsx";

const CompanyPage = () => {
  return (
    <>
      < Header />
      < AccountAside />
      < CPDInput /> 
      < Footer />
    </>
  );
};

export default CompanyPage;