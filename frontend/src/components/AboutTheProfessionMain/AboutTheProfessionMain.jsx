import "./AboutTheProfessionMain.scss";
import { Link } from "react-router-dom";
//import Level_4_SLD from "../../images/Level_4_SLD.jpg"
import C from "../../images/C.png"
//import LightingEffect from "../LightingEffect/LightingEffect.jsx"
import { useContext, useEffect } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";


const AboutTheProfessionMain = () => {

  const { isAuth, setGotoPage, setButtonPos, setAsidePos } = useContext(SectionsContext);
  const buttonPosCheck = ()=>{
    if (isAuth) {setButtonPos("showBut"); setAsidePos ("accountAside")
  }
}

useEffect(() => {
  buttonPosCheck(SectionsContext)
});


  return (
    <main> {/* Styling in global */}

      <section id="profession_main">
        <h1 id="lichtdesigner_h1">
          Der/die Lichtdesigner/in: <br />Ein moderner Beruf mit historischen Wurzeln
        </h1>
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
  
            <p>Einführung von Gaslicht: Im 19. Jahrhundert wurde Gaslicht in Theatern eingeführt. Dies ermöglichte erstmals eine gewisse Kontrolle über die Helligkeit und Farbe des Lichts. Gaslichtoperatoren waren verantwortlich für die Bedienung der Gaslampen und die Anpassung der Beleuchtung während der Vorstellungen. Obwohl sie noch keine umfassenden Lichtdesigner waren, legten sie den Grundstein für die Entwicklung des Berufs.
            </p>
            <p>Erfindung der elektrischen Beleuchtung: Mit der Erfindung der Glühbirne und der Einführung der elektrischen Beleuchtung Ende des 19. Jahrhunderts wurden neue Möglichkeiten für die Lichtgestaltung geschaffen. Die steuerbare und flexible Natur der elektrischen Beleuchtung eröffnete neue kreative Wege, um die Stimmung und Atmosphäre in Theateraufführungen und anderen Veranstaltungen zu beeinflussen.</p>
            <p>Entwicklung des Bühnenbilds: Im 20. Jahrhundert gewann das Bühnenbild an Bedeutung, und die Beleuchtung wurde zu einem integralen Bestandteil der Inszenierung. Kreative Köpfe wie Adolphe Appia und später Richard Pilbrow erkannten die Bedeutung der Beleuchtung als gestalterisches Element und trugen zur Weiterentwicklung des Lichtdesigns bei.</p>
            <p>Technologische Fortschritte: Mit dem Aufkommen von Computern und digitaler Technologie in den letzten Jahrzehnten hat sich das Lichtdesign erneut sprunghaft weiterentwickelt. Lichtdesigner können jetzt komplexe Lichtshows programmieren und steuern, bei denen sie Lichtfarben, -bewegungen und -effekte präzise kontrollieren können.</p>
            <p>Heutzutage ist der Beruf des Lichtdesigners in vielen Bereichen etabliert, darunter Theater, Konzerte, Architektur, Events und Filmproduktion. Lichtdesigner arbeiten mit einer Vielzahl von Beleuchtungstechnologien und -systemen, um spektakuläre visuelle Erlebnisse zu schaffen und die gewünschten Stimmungen zu erzeugen.</p>
          </div>
        </div>
      </section>  
    </main>
  );
};
export default AboutTheProfessionMain;
