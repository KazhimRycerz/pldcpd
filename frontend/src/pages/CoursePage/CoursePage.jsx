import './CoursePage.scss'
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CoursePageMain from "../../components/CoursePageMain/CoursePageMain.jsx";
import AccountAside from "../../components/AccountAside/AccountAside.jsx";

const CoursePage = () => {
    
    return(
      <>
        <Header />
        <AccountAside />
        <CoursePageMain />
        <Footer />
      </>
    )
}


export default CoursePage;