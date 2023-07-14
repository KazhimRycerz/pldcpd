import "./AboutTheProfessionMain.scss";
//import { Link } from "react-router-dom";
//import Level_4_SLD from "../../images/Level_4_SLD.jpg"
import C from "../../images/C.png"
//import LightingEffect from "../LightingEffect/LightingEffect.jsx"
import { useState, useContext, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
import { HashLink as Link } from 'react-router-hash-link';


const AboutTheProfessionMain = () => {
  
  const { isAuth, setGotoPage, setButtonPos, setAsidePos } = useContext(SectionsContext);
  const [btnOpen, setBtnOpen] = useState(false);
  const buttonPosCheck = ()=>{
    if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
    }
  }

  const openDropdown =()=>{
    setBtnOpen(true);
  };
  const closeDropdown =()=>{
    setBtnOpen(false);
  };

  useEffect(() => {
    buttonPosCheck(SectionsContext)
  }, []);


  return (
    <main> {/* Styling in global */}

      <section id="profession_main">
        <h2 id="lichtdesigner_h2">
          Der/die Lichtdesigner/in: <br />Ein moderner Beruf mit historischen Wurzeln
        </h2>
      </section>
              
      <section className="derLichtdesigner">
        <div className="infobox_intro">
          <h2> Was ist ein Lichtdesigner? </h2>
          <div>
            <p>Ein Lichtdesigner ist ein Fachmann oder Künstler, der sich mit der Gestaltung und Umsetzung von Beleuchtungskonzepten in verschiedenen Bereichen beschäftigt. Ihr Hauptaugenmerk liegt auf der kreativen Nutzung von Licht, um eine bestimmte Atmosphäre zu schaffen, die Stimmung zu verstärken oder eine bestimmte Botschaft zu vermitteln.</p>
            <p>Lichtdesigner arbeiten in einer Vielzahl von Bereichen, darunter Theater, Film, Fernsehen, Konzerte, Events, Architektur und Innenraumgestaltung. unser Fokus liegt auf dem Bereich der Architektur, also der Gestaltung von Räumen und deren Funktion. Sie arbeiten eng mit Regisseuren, Bühnenbildnern, Kameraleuten und anderen Mitgliedern des Produktionsteams zusammen, um die gewünschte Lichtstimmung zu erreichen.</p>
            <p>Die Aufgaben eines Lichtdesigners umfassen die Entwicklung von Beleuchtungskonzepten, das Erstellen von Lichtplänen, die Auswahl und Positionierung von Lichtquellen, die Steuerung und Programmierung von Lichttechnik, die Anpassung von Lichtfarben und Intensitäten sowie die Berücksichtigung von Sicherheitsaspekten und Vorschriften.</p>
            <p>Ein guter Lichtdesigner verfügt über ein Verständnis für die ästhetischen und emotionalen Auswirkungen von Licht und ist in der Lage, technisches Fachwissen mit kreativen Fähigkeiten zu verbinden. Sie müssen über Kenntnisse in Beleuchtungstechnik, Lichtsteuerungssystemen und elektrischen Grundlagen verfügen. Darüber hinaus ist es wichtig, Trends in der Lichttechnik und neue Technologien zu verfolgen, um innovative Lösungen anbieten zu können.</p>
          </div>
        </div>
      </section>

        <Link to="/home">
          <img className="Trenner" src={C} alt="" />
        </Link>
      
        <section id="Promoter_1">
          <div>
            <p>lighting design at its best!</p>
          </div>
        </section>

        <Link to="/home">
          <img className="Trenner" src={C} alt="" />
        </Link>

      <section className="derLichtdesigner">
        <div className="infobox_intro">
          <h2> Wie ist der Beruf des Lichtdesigners entstanden? </h2>
          <div>
            <p>Der Beruf des Lichtdesigners hat sich im Laufe der Zeit entwickelt und ist eng mit den Entwicklungen in den Bereichen Theater, Bühnenproduktion und Architektur verbunden. Hier ist eine grobe Chronologie der Entstehung des Berufs:</p>  
            <p>Frühes Theater: In der Antike und im Mittelalter wurde die Beleuchtung in Theatern hauptsächlich durch offenes Tageslicht oder einfache Öllampen realisiert. Die Beleuchtung hatte in erster Linie die Funktion, die Schauspieler sichtbar zu machen. Ein spezialisierter Beruf des Lichtdesigners existierte zu dieser Zeit noch nicht.</p>
            <p>Einführung von Gaslicht: Im 19. Jahrhundert wurde Gaslicht in Theatern eingeführt. Dies ermöglichte erstmals eine gewisse Kontrolle über die Helligkeit und Farbe des Lichts. Gaslichtoperatoren waren verantwortlich für die Bedienung der Gaslampen und die Anpassung der Beleuchtung während der Vorstellungen. Obwohl sie noch keine umfassenden Lichtdesigner waren, legten sie den Grundstein für die Entwicklung des Berufs.</p>
            <p>Erfindung der elektrischen Beleuchtung: Mit der Erfindung der Glühbirne und der Einführung der elektrischen Beleuchtung Ende des 19. Jahrhunderts wurden neue Möglichkeiten für die Lichtgestaltung geschaffen. Die steuerbare und flexible Natur der elektrischen Beleuchtung eröffnete neue kreative Wege, um die Stimmung und Atmosphäre in Theateraufführungen und anderen Veranstaltungen zu beeinflussen.</p>
            <p>Entwicklung des Bühnenbilds: Im 20. Jahrhundert gewann das Bühnenbild an Bedeutung, und die Beleuchtung wurde zu einem integralen Bestandteil der Inszenierung. Kreative Köpfe wie Adolphe Appia und später Richard Pilbrow erkannten die Bedeutung der Beleuchtung als gestalterisches Element und trugen zur Weiterentwicklung des Lichtdesigns bei.</p>
            <p>Technologische Fortschritte: Mit dem Aufkommen von Computern und digitaler Technologie in den letzten Jahrzehnten hat sich das Lichtdesign erneut sprunghaft weiterentwickelt. Lichtdesigner können jetzt komplexe Lichtshows programmieren und steuern, bei denen sie Lichtfarben, -bewegungen und -effekte präzise kontrollieren können.</p>
            <p>Heutzutage ist der Beruf des Lichtdesigners in vielen Bereichen etabliert, darunter Theater, Konzerte, Events und Filmproduktion. Die Architektur bildet seit den 90er Jahren des letzten Jahrhundert eine eigenständigen starken Bereich. Lichtdesigner arbeiten mit einer Vielzahl von Beleuchtungstechnologien und -systemen, um spektakuläre visuelle Erlebnisse zu schaffen und die gewünschten Stimmungen zu erzeugen. Doch Lichtdesign bedeutet auch nichtvisuelle Effekte für Mensch, Tier und Natur zu ermöglichen.</p>
          </div>
        </div>
      </section> 

      <section id="career">
        <div className="infobox_intro">
          <h2> Lichtdesigner - <br />Wissen und Themen <br />auf der Karriereleiter </h2>
          
          <div id="careerLadder"> 
            <div onMouseLeave={closeDropdown}>
              <h3 onMouseOver={openDropdown} onClick={closeDropdown}>  <span className="C">C</span> Auswahl Level I bis IX
              {btnOpen && (
              <ul>
                <li><Link to="/abouttheprofession#levelI">  Level I</Link></li>
                <li><Link to="/abouttheprofession#levelII">  Level II</Link></li>
                <li><Link to="/abouttheprofession#levelIII">  Level III</Link></li>
                <li><Link to="/abouttheprofession#levelIV">  Level IV</Link></li>
                <li><Link to="/abouttheprofession#levelV">  Level V</Link></li>
                <li><Link to="/abouttheprofession#levelVI">  Level VI</Link></li>
                <li><Link to="/abouttheprofession#levelVII">  Level VII</Link></li>
                <li><Link to="/abouttheprofession#levelVIII">  Level VIII</Link></li>
                <li><Link to="/abouttheprofession#levelIX">  Level IX</Link></li>
              </ul>
              )}
              </h3>
            </div>

            <div id="levelI"> 
              <h3> Level I - Student in lighting design<br />(Bachelor, Master – 3 to 5 years) </h3>
              <div>
                  <ul> Knowledge you need to cover...
                    <li> <span className="C">C</span> Latest technical lighting knowledge</li>
                    <li> <span className="C">C</span> Latest lighting design techniques/skills</li>
                    <li> <span className="C">C</span> Theoretical and practical know-how on the creative arts</li>
                    <li> <span className="C">C</span> Practical experience in (architectural) lighting design </li>
                    <li> <span className="C">C</span> Visual and verbal communication</li>
                  </ul>
                <img src={require('../../images/Level_1_SLD.jpg')} alt="" />
              </div>
            </div>
            <div id="levelII">
              <h3> Level II - Newly qualified lighting designer <br />(1 year minimum of qualifying employment)</h3>
              <h4>working as a practising lighting designer from here onwards </h4>
              <div>
                  <ul >Knowledge you need to cover...
                    <li> <span className="C">C</span> Latest technical lighting knowledge</li>
                    <li> <span className="C">C</span> Latest lighting design techniques/skills</li>
                    <li> <span className="C">C</span> Presentation techniques to colleagues/clients</li>
                    <li> <span className="C">C</span> Lighting calculations </li>
                    <li> <span className="C">C</span> Multidisciplinary teamwork</li>
                    <li> <span className="C">C</span> Expression of views/opinions</li>
                    <li> <span className="C">C</span> Observation and evaluation of architectural space</li>
                  </ul>
                <img src={require('../../images/Level_2_NQLD.jpg')} alt="" />
              </div>
            </div>
            <div id="levelIII">
              <h3> Level III - Junior lighting designer <br />(1 year minimum)</h3>
              <div>
                  <ul>Knowledge you need to cover...
                    <li> <span className="C">C</span> Latest technical lighting knowledge</li>
                    <li> <span className="C">C</span> Latest lighting design techniques/skills</li>
                    <li> <span className="C">C</span> Presentation techniques to colleagues/clients</li>
                    <li> <span className="C">C</span> Lighting calculations </li>
                    <li> <span className="C">C</span> Multidisciplinary teamwork</li>
                    <li> <span className="C">C</span> Expression of views/opinions</li>
                    <li> <span className="C">C</span> Observation and evaluation of architectural space</li>
                  </ul>
                <img src={require('../../images/Level_3_JLD.jpg')} alt="" />
              </div>
            </div>
            <div id="levelIV">
              <h3> Level IV - Project lighting designer <br />(2 years minimum)</h3>
              <div>
                  <ul>
                    <li> <span className="C">C</span> Latest technical lighting knowledge</li>
                    <li> <span className="C">C</span> Latest lighting design techniques/skills</li>
                    <li> <span className="C">C</span> Presentation techniques to colleagues/clients</li>
                    <li> <span className="C">C</span> Lighting calculations </li>
                    <li> <span className="C">C</span> Multidisciplinary teamwork</li>
                    <li> <span className="C">C</span> Expression of views/opinions</li>
                    <li> <span className="C">C</span> Observation and evaluation of architectural space</li>
                  </ul>
                <img src={require('../../images/Level_4_SLD.jpg')} alt="" />
              </div>
            </div>
            <div id="levelV">
              <h3> Level V - Senior lighting designer <br />(4 years minimum)</h3>
                <div>
                  <ul>
                    <li> <span className="C">C</span> Latest technical lighting knowledge</li>
                    <li> <span className="C">C</span> Latest lighting design techniques/skills</li>
                    <li> <span className="C">C</span> Presentation techniques to colleagues/clients</li>
                    <li> <span className="C">C</span> Lighting calculations </li>
                    <li> <span className="C">C</span> Multidisciplinary teamwork</li>
                    <li> <span className="C">C</span> Expression of views/opinions</li>
                    <li> <span className="C">C</span> Observation and evaluation of architectural space</li>
                  </ul>
                  <img src={require('../../images/level_5_senior.jpg')} alt="" />
                </div>
            </div>
            <div id="levelVI">
              <h3> Level VI - Associate lighting designer <br />(4 years minimum)</h3>
                <div>
                  <ul>
                    <li> <span className="C">C</span> Latest technical lighting knowledge</li>
                    <li> <span className="C">C</span> Latest lighting design techniques/skills</li>
                    <li> <span className="C">C</span> Presentation techniques to colleagues/clients</li>
                    <li> <span className="C">C</span> Lighting calculations </li>
                    <li> <span className="C">C</span> Multidisciplinary teamwork</li>
                    <li> <span className="C">C</span> Expression of views/opinions</li>
                    <li> <span className="C">C</span> Observation and evaluation of architectural space</li>
                  </ul>
                  <img src={require('../../images/level_6_associate.jpg')} alt="" />
                </div>
            </div>
            <div id="levelVII">
              <h3> Level VII - Principal lighting designer </h3>
                <div>
                  <ul>
                    <li> <span className="C">C</span> Latest technical lighting knowledge</li>
                    <li> <span className="C">C</span> Latest lighting design techniques/skills</li>
                    <li> <span className="C">C</span> Presentation techniques to colleagues/clients</li>
                    <li> <span className="C">C</span> Lighting calculations </li>
                    <li> <span className="C">C</span> Multidisciplinary teamwork</li>
                    <li> <span className="C">C</span> Expression of views/opinions</li>
                    <li> <span className="C">C</span> Observation and evaluation of architectural space</li>
                  </ul>
                  <img src={require('../../images/level_7_principal.jpg')} alt="" />
                </div>
            </div>
            <div id="levelVIII">
              <h3> Level VIII - Master lighting designer <br />(25 years experience minimum)</h3>
                <div>
                  <ul>
                    <li> <span className="C">C</span> Latest technical lighting knowledge</li>
                    <li> <span className="C">C</span> Latest lighting design techniques/skills</li>
                    <li> <span className="C">C</span> Presentation techniques to colleagues/clients</li>
                    <li> <span className="C">C</span> Lighting calculations </li>
                    <li> <span className="C">C</span> Multidisciplinary teamwork</li>
                    <li> <span className="C">C</span> Expression of views/opinions</li>
                    <li> <span className="C">C</span> Observation and evaluation of architectural space</li>
                  </ul>
                  <img src={require('../../images/level_8_master.jpg')} alt="" />
               </div>
            </div>
            <div id="levelIX">
              <h3> Level IX - Authorised expert lighting designer </h3>
                <div>
                <ul>
                  <li> <span className="C">C</span> Latest technical lighting knowledge</li>
                  <li> <span className="C">C</span> Latest lighting design techniques/skills</li>
                  <li> <span className="C">C</span> Presentation techniques to colleagues/clients</li>
                  <li> <span className="C">C</span> Lighting calculations </li>
                  <li> <span className="C">C</span> Multidisciplinary teamwork</li>
                  <li> <span className="C">C</span> Expression of views/opinions</li>
                  <li> <span className="C">C</span> Observation and evaluation of architectural space</li>
                </ul>
              <img src={require('../../images/level_9_authorised_expert.jpg')} alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>  
    </main>
  );
};
export default AboutTheProfessionMain;
