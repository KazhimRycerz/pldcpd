import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import CareerPlanningMain from '../../components/CareerPlanningMain/CareerPlanningMain.jsx'
import './CareerPlanning.scss'

const CareerPlanning = () => {
  return (
    <>
      <Header />
      <main id="CareerPlanningMain">
        <h1 id="digitaleBaustelle">
          This will be the buildingsite for your personal careerplanning.
        </h1>
      </main>
      <CareerPlanningMain />
      <Footer />
    </>
  )
};

export default CareerPlanning;
