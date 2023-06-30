//import { NavLink } from 'react-router-dom'
import Styles from "./Home.scss";
import Header from "../../components/Header/Header.jsx";
import AccountAside from "../../components/AccountAside/AccountAside.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import HomeMain from "../../components/HomeMain/HomeMain.jsx";
//import Slider from "../../components/Slider/Slider.jsx"

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
