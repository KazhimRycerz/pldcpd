//import { NavLink } from 'react-router-dom'
import "./Home.scss";
import Header from "../../components/Header/Header.js";
import AccountAside from "../../components/AccountAside/AccountAside.js";
import Footer from "../../components/Footer/Footer.js";
import HomeMain from "../../components/HomeMain/HomeMain.js";

const Home = () => {
  return (
    <>
        <Header />
        <AccountAside />
        <HomeMain />
        <Footer />
    </>
  );
};

export default Home;
