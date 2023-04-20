import './CourseListPage.scss'
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import CourseListMain from "../../components/CourseListMain/CourseListMain.jsx";
import AccountAside from "../../components/AccountAside/AccountAside.jsx";

const CourseListPage = () => {
    
    return(
        <>
          <Header />
          <AccountAside />
          <CourseListMain />
          <Footer />
        </>  
    )
}


export default CourseListPage;