//import { NavLink } from 'react-router-dom'
import "./Register.scss";
import Header from "../../components/Header/Header.jsx";
import RegisterForm from "../../components/RegisterForm/RegisterForm.jsx";
//import Footer from "../../components/Footer/Footer.jsx";

const Register = () => {
  return (
    <>
      <Header />
      <RegisterForm />
      {/* <Footer /> */}
    </>
  );
};

export default Register;