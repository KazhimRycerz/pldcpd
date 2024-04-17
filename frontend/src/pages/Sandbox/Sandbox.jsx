import Header from '../../components/Header/Header.jsx'
import Footer from '../../components/Footer/Footer.jsx'
import ImageUpload from '../../components/ImageUpload/ImageUpload.jsx'
import Clock from '../../components/Clock/Clock.jsx'
import { SendMessageToWhatsApp, CodeSenden, RandomTextGenerator  } from '../../components/Message/Message.jsx'
import './Sandbox.scss'

const Sandbox = () => {
  return (
    <>
      <Header />
      <main>
        <div id="sandbox">
          <p>this is the sandbox of this website</p>
      {/* <Clock /> */}
      <SendMessageToWhatsApp />
      <CodeSenden />
      <RandomTextGenerator />
        </div>
      {/* <ImageUpload /> */}
      </main>
      {/* <Footer /> */}
    </>
  )
};

export default Sandbox;
