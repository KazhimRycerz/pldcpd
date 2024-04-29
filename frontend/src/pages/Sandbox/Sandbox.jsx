import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import ImageUpload from '../../components/ImageUpload/ImageUpload.jsx'
import Clock from '../../components/Clock/Clock.jsx'
import FractalLeaves from '../../components/FractalLeaves/FractalLeaves.jsx'
import BeforeAfterSlider from '../../components/BeforeAfterSlider/BeforeAfterSlider.jsx'
import { SendMessageToWhatsApp, CodeSenden, RandomTextGenerator  } from '../../components/Message/Message.jsx'
import './Sandbox.scss'
import JoachimRitter from '../../../src/images/Joachim_Rycerz.jpg';
import KazhimRitter from '../../../src/images/Kazhim_Rycerz.jpg';
import Bahai_day from '../../../src/images/Bahai_day.jpg';
import Bahai_night from '../../../src/images/Bahai_night.jpg';

const Sandbox = () => {
  return (
    <>
      <Header />
      <main id="sandboxMain">
        <div id="sandbox">
          <p>this is the sandbox of this website</p>
          <br />
          {/* <Clock /> */}
          <ImageUpload />
          {/* <SendMessageToWhatsApp /> */}
          {/* <CodeSenden /> */}
          {/* <RandomTextGenerator /> */}
          {/* <BeforeAfterSlider 
          beforeImage= { Bahai_day } 
          afterImage= { Bahai_night }
          size="110" />
          <br />
          <BeforeAfterSlider 
          beforeImage= { JoachimRitter } 
          afterImage= { KazhimRitter } /> */}
          {/* <FractalLeaves /> */}
        </div>
      </main>
      {/* <Footer /> */}
    </>
  )
};

export default Sandbox;
