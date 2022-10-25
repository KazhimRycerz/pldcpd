import "./HomeMain.scss";
import { Link } from "react-router-dom";
import Level_4_SLD from "../../images/Level_4_SLD.jpg"
import C from "../../images/C.png"
import level_1_SLD from "../../images/Level_1_SLD.jpg"
import level_2_NQLD from "../../images/Level_2_NQLD.jpg"
import level_3_JLD from "../../images/Level_3_JLD.jpg"
import level_4_SLD from "../../images/Level_4_SLD.jpg"
import level_5_senior from "../../images/level_5_senior.jpg"
import level_6_associate from "../../images/level_6_associate.jpg"
import level_7_principal from "../../images/level_7_principal.jpg"
import level_8_master from "../../images/level_8_master.jpg"
import level_9_authorised_expert from "../../images/level_9_authorised_expert.jpg"
import vulkan from "../../images/Vulkan.gif"
import Egon_Zitter_7 from "../../images/Egon_Zitter_7.jpg"
import Egon_Zitter_8_Libellen from "../../images/Egon_Zitter_8_Libellen.jpg"
import Sonnenuntergang from "../../images/Sonnenuntergang.jpg"
import unsplash from "../../images/unsplash.jpg"



const HomeMain = () => {
  return (
    <main>
      <section id="Gruß_main">
        <h1 id="Gruß_main_h1">
          {" "}
          Ihre persönliche Berufsplanung im Lichtdesign
        </h1>
        <p id="Gruß_main_p">
          {" "}
          Willkommen auf der Weiterbildungplattform für professionelle
          Lichtdesigner. Hier können Sie Ihre Karriere planen und kontinuierlich
          prüfen, welchen Status Sie erreicht haben. Auch geben wir Ihnen
          Hinweise auf neue Themen und Learnmöglichkeiten und welchen Abschluss{" "}
          <Link to="/careerplanning">
            <i className="fa-solid fa-graduation-cap"></i>
          </Link>{" "}
          Sie erzielen können. <Link to="/abouttheprofession"> More </Link>
        </p>
      </section>

      <div id="Content">
        <section id="C1">
          <article id="C1A1">
            <img src={Level_4_SLD} alt=""/>
            <h3>Professionalität</h3>
            <p>
              Sie wollen ein anerkannter Lichtdesigner werden? Dann sind Sie
              hier genau richtig. Wir unterstützen Sie bei Ihrer
              Karriereplanung, geben Ihnen Hinweise zu Ihrer beruflichen
              Entwicklung und empfehlen Ihrer Weiterbildungsangebote und
              Fachartikel. Steigen Sie ein in Ihre Karriere als Lighting
              Designer...{" "}
            </p>
            <Link to="/planninyourcareer">
              {" "}
              More <img src={C} alt=""/>
            </Link>
          </article>

          <div id="C1Center">
            <article id="C1A2">
              <h3>Themen und Lernmittel</h3>
              <p>
                Brauchen sie Hinweise auf neue Themen und Lernmittel?
                Empfehlungen finden Sie
              </p>{" "}
              <Link to="/abouttheprofession">
                hier
                <img src={C} alt=""/>
              </Link>
            </article>

            <article id="C1A3">
              <h3>Teil einer Community</h3>
              <p>
                Wollen sie ein Teil der Community sein? Kennen Sie schon das
                neue Netzwerk für Lichtdesigner? Dann sollten Sie rasch hier
                schauen
              </p>{" "}
              <Link to="/abouttheprofession">
                hier
                <img src={C} alt=""/>
              </Link>
            </article>
          </div>

          <article id="C1A4">
            <h3>Ihre Karriere nach Plan</h3>
            <p>
              Hier können Sie Ihre Karriere planen und kontinuierlich prüfen,
              welchen Status Sie erreicht haben. Auch geben wir Ihnen Hinweise
              auf neue Themen und Learnmöglichkeiten. Hier können Sie Ihre
              Karriere planen und kontinuierlich prüfen, welchen Status Sie
              erreicht haben. Auch geben wir Ihnen Hinweise auf neue Themen und
              Learnmöglichkeiten.
            </p>
            <Link to="/abouttheprofession"> More </Link>
            <br />
            <img src={level_5_senior} alt=""/>
            <Link to="/planningyourcareer">
            <img src={C} alt=""/>
            </Link>
          </article>
        </section>
        <section id="learningbox_1">
          <div className="infobox_intro">
            <h2> Aktuelle Lernangebote </h2>
            <p>
              Hier können sie über die neusten Angebote zur Weiterbildung
              erfahren. Klicken Sie <Link to="/#">hier</Link> und schauen Sie
              im Detail, was zur weiterbildung angeboten wird.
            </p>
            <Link to="/#">
            <img src={C} alt="" className="logo_cpd" />
            </Link>
          </div>

          <div id="lb_1_angebote">
            <div>
              <h5>
                {" "}
                Themenbereich
                <br />
                Lichtdesign{" "}
              </h5>
              <p>
                Für aktuelle Angebote folge hier
                <Link className="C" to="/pldcpd_account">
                  C
                </Link>
              </p>
              <img src={vulkan} alt="" />
            </div>

            <div>
              <h5>
                {" "}
                Themenbereich <br />
                Lichttechnik
              </h5>
              <p>
                {" "}
                Für aktuelle Angebote folge hier{" "}
                <Link className="C" to="latestlearningoffers">
                  C
                </Link>
              </p>
              <img src={Egon_Zitter_7} alt="" />
            </div>

            <div>
              <h5>
                {" "}
                Themenbereich <br />
                Berufspraxis
              </h5>
              <p>
                Für aktuelle Angebote folge hier{" "}
                <Link className="C" to="/latestlearningoffers">
                  C
                </Link>
              </p>
              <img src={Egon_Zitter_8_Libellen} alt="" />
            </div>

            <div>
              <h5>
                Themenbereich <br />
                Tageslicht
              </h5>
              <p>
                {" "}
                Für aktuelle Angebote folge hier{" "}
                <Link className="C" to="/latestlearningoffers">
                  C
                </Link>
              </p>
              <img src={Sonnenuntergang} alt="" />
            </div>

            <div>
              <h5>
                Themenbereich <br />
                Meinung
              </h5>
              <p>
                {" "}
                Für aktuelle Angebote folge hier{" "}
                <Link className="C" to="/latestlearningoffers">
                  C
                </Link>
              </p>
              <img src={unsplash} alt="" />
            </div>
          </div>
        </section>
        <Link to="/home">
          <img className="Trenner" src={C} alt="" />
        </Link>
        <div id="Promoter_1">
          <div>
            <p>Lightingdesign at it's best!</p>
          </div>
        </div>
        <Link to="/home">
          <img className="Trenner" src={C} alt="" />
        </Link>
        <section id="learningbox_2">
          <div className="infobox_intro">
            <h2> Aktuelle Lernangebote </h2>
            <p>
              Hier können sie über die neusten Angebote zur Weiterbildung
              erfahren. Klicken Sie <Link to="/latestlearningoffers">hier</Link> und schauen Sie
              im Detail, was zur Weiterbildung angeboten wird.
            </p>
            <Link to="/#">
              <img src={C} alt="" className="logo_cpd" />
            </Link>
          </div>

          <div id="infobox_table">
            <div id="info_1_1">
              <div>
                <h2>Lernangebote</h2>
                <label for="Filter">Sortiert nach</label>
                <select name="Filter" id="Filter">
                  <option value="Themenfeld">Themenfeld</option>
                  <option value="Art">Art</option>
                  <option value="Datum">Datum</option>
                  <option value="Level">Level</option>
                </select>
                <br />
              </div>

              <table>
                <thead>
                  <colgroup>
                    <col width="10%" />
                    <col width="30%" />
                    <col width="20%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                  </colgroup>

                  <tr>
                    <th>Datum</th>
                    <th>
                      <strong>Thema</strong>
                    </th>
                    <th>Referent/Autor</th>
                    <th>Themenfeld</th>
                    <th>Level</th>
                    <th>Art</th>
                    <th>Link</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>20.10.2021</td>
                    <td>Die neue Art des Lichtdesigns in der Architektur</td>
                    <td>Kazhim Rycerz / Kazhal Akbari</td>
                    <td>Design</td>
                    <td>4-5</td>
                    <td>Artikel</td>
                    <td>
                      <Link to="/https://pld-m.com" target="_blank" className="C">C</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>20.10.2021</td>
                    <td>Li-Fi - Intelligente Netzwerke</td>
                    <td>Kazhim Rycerz / Kazhal Akbari</td>
                    <td>Design</td>
                    <td>2-5</td>
                    <td>Onlineseminar</td>
                    <td>
                      <Link to="/https://pld-m.com" target="_blank" className="C">C</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>20.10.2021</td>
                    <td>Wie ein Büro aufgebaut wird</td>
                    <td>Kazhim Rycerz / Kazhal Akbari</td>
                    <td>Berufspraxis</td>
                    <td>6</td>
                    <td>Life-Seminar</td>
                    <td>
                    <Link to="/https://pld-m.com" target="_blank" className="C">C</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>20.10.2021</td>
                    <td>Die neue Art des Lichtdesigns in der Architektur</td>
                    <td>Kazhim Rycerz / Kazhal Akbari</td>
                    <td>Design</td>
                    <td>4-5</td>
                    <td>Artikel</td>
                    <td>
                    <Link to="/https://pld-m.com" target="_blank" className="C">C</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>20.10.2021</td>
                    <td>Die neue Art des Lichtdesigns in der Architektur</td>
                    <td>Kazhim Rycerz / Kazhal Akbari</td>
                    <td>Design</td>
                    <td>4-5</td>
                    <td>Artikel</td>
                    <td>
                    <Link to="/https://pld-m.com" target="_blank" className="C">C</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>20.10.2021</td>
                    <td>Die neue Art des Lichtdesigns in der Architektur</td>
                    <td>Peter Andres</td>
                    <td>Design</td>
                    <td>4-5</td>
                    <td>Artikel</td>
                    <td>
                    <Link to="/https://pld-m.com" target="_blank" className="C">C</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>20.10.2021</td>
                    <td>Die neue Art des Lichtdesigns in der Architektur</td>
                    <td>Joachim Ritter</td>
                    <td>Beruf</td>
                    <td>4-5</td>
                    <td>Artikel</td>
                    <td>
                    <Link to="/https://pld-m.com" target="_blank" className="C">C</Link>
                    </td>
                  </tr>
                  <tr>
                    <td>20.10.2021</td>
                    <td>Die neue Art des Lichtdesigns in der Architektur</td>
                    <td>Kazhim Rycerz / Kazhal Akbari</td>
                    <td>Design</td>
                    <td>4-5</td>
                    <td>Artikel</td>
                    <td>
                    <Link to="/https://pld-m.com" target="_blank" className="C">C</Link>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <td>5</td>
                  <td>20</td>
                </tfoot>
              </table>
              <br />
              <br />
            </div>

            <div id="info_1_2">
              <img src={Egon_Zitter_7} alt="" />
              <h2>Special II</h2>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In
                officiis alias impedit, incidunt recusandae fugiat, eos quia
                atque voluptatem, veritatis. Magni ab architecto blanditiis
                aperiam ullam illum rerum accusamus maxime, aliquid, vel
                laudantium dignissimos, cupiditate ratione sapiente amet labore
                dolores! Saepe officiis magni similique non corporis accusamus
                ex reprehenderit, expedita aliquid vero? Rem, rerum culpa?
                Nostrum, libero cum excepturi quis ab voluptatem sunt dolores
                non ratione maxime.
              </p>
            </div>
          </div>
        </section>
        <Link to="/home">
          <img className="Trenner" src={C} alt="" />{" "}
        </Link>
        <section id="infobox_2">
          <div className="infobox_intro">
            <h2> Aktuelle Lernangebote </h2>
            <p>
              Hier können sie die neusten Angebote zur Weiterbildung sehen.
              Klicken Sie und schauen Sie im Detail, was angeboten wird.
            </p>
            <Link to="/home">
              <img src={C} alt="" className="logo_cpd" />
            </Link>
          </div>

          <div id="ib_2_angebote">
            <div id="box1">
              <h3>Themenbereich Design</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Expedita nostrum voluptatibus, reiciendis!{" "}
                <img src={vulkan} alt="" /> Dolorum nisi aspernatur unde
                est, magnam excepturi possimus.pariatur molestias accusamus
                recusandae minima cum, animi, sapiente rem iste earum ipsum aut
                ratione. Ad maiores corrupti magnam deleniti molestias aperiam
                quas saepe repellendus architecto, perferendis consectetur est
                quae, fuga adipisci ullam fugit doloribus recusandae maxime
                reprehenderit.
              </p>
            </div>

            <div id="box2">
              <h3>Box 2</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Impedit perferendis velit tenetur asperiores at animi repellat
                accusamus, culpa soluta cumque eos tempore dolor veritatis quod
                veniam omnis ea consequatur mollitia excepturi labore? Deleniti
                officiis molestiae aut consectetur earum aperiam! Saepe.
              </p>
            </div>

            <div id="box3">
              <h3>Box 3</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
                tenetur molestiae natus ullam eos qui aperiam, minus officiis
                cumque corporis quia sit veritatis soluta neque, velit magnam
                tempora. Excepturi reiciendis quae, in quos, magnam totam
                laborum veritatis dolorum, omnis aspernatur quasi, dolores iste
                ipsam vitae veniam fugit alias ratione aliquam. Nulla optio
                praesentium repellat, vel, nam eligendi possimus pariatur
                dolorem?
              </p>
            </div>

            <div id="box4">
              <h3>Box 4</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Sapiente vero, repudiandae debitis fugiat atque itaque
                repellendus hic, recusandae placeat quidem.
              </p>
            </div>

            <div id="box5">
              <h3>Box 5</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum
                saepe quisquam numquam adipisci tempore magni quasi distinctio
                eaque quod necessitatibus officiis pariatur perspiciatis,
                doloribus debitis culpa nisi dolorum esse porro nobis ut nulla,
                minima ipsa dolores aliquid tempora. Voluptas, eum.
              </p>
            </div>

            <div id="box6">
              <h3>Box 6</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorem harum obcaecati iusto quibusdam dicta ratione fugit a
                animi sequi odio!
              </p>
            </div>

            <div id="box7">
              <h3>Box 7</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Dolorem harum obcaecati iusto quibusdam dicta ratione fugit a
                animi sequi odio!
              </p>
            </div>
          </div>
        </section>
        <br />
        <br />
        <img className="Trenner" src={C} alt="" />{" "}
        <Link to="/home"></Link>
        <br />
        <br />
        <br />
        <section id="learningbox_5">
          <div className="infobox_intro">
            <h2>
              {" "}
              Lernen nach Karrierelevel - Angebote und Themen nach Ihrer
              Berufserfahrung
            </h2>
            <p>
              Hier erhalten Sie Vorschläge zur Weiterbildung in Ihrem
              Karrierelevel. Klicken Sie und schauen Sie im Detail, was
              angeboten wird.
            </p>
            <Link to="/home">
              <img src={C} alt="" className="logo_cpd" />
            </Link>
          </div>

          <div id="karrierebox">
            <div id="learning_5_1">
              <div>
                <p>Professional Level I</p>
                <h3>Student</h3>
                <p>
                  Dieses Level ist für Einsteiger, die noch kein Vorwissen zum
                  Thema Lichtdesign mitbringen. Diese Phase ist mit ein bis zwei
                  Jahen definiert.
                </p>
              </div>
              <img src={level_1_SLD}alt="" />
            </div>

            <div id="learning_5_2">
              <div>
                <p> Professional Level II</p>
                <h3>Newly qualified</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae a voluptate omnis praesentium nemo officiis aut
                  deleniti animi doloribus illum.
                </p>
              </div>
              <img src={level_2_NQLD}alt="" />
            </div>

            <div id="learning_5_3">
              <div>
                <p>Professional Level III</p>
                <h3>Junior Designer</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae a voluptate omnis praesentium nemo officiis aut
                  deleniti animi doloribus illum.
                </p>
              </div>
              <img src={level_3_JLD}alt="" />
            </div>

            <div id="learning_5_4">
              <div>
                {" "}
                <p>Professional Level IV</p> <h3>Project Designer</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae a voluptate omnis praesentium nemo officiis aut
                  deleniti animi doloribus illum.
                </p>
              </div>
              <img src={level_4_SLD}alt="" />
            </div>

            <div id="learning_5_5">
              <div>
                {" "}
                <p>Professional Level V</p> <h3>Senior Designer</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae a voluptate omnis praesentium nemo officiis aut
                  deleniti animi doloribus illum.
                </p>
              </div>
              <img src={level_5_senior}alt="" />
            </div>

            <div id="learning_5_6">
              <div>
                {" "}
                <p>Professional Level VI</p> <h3>Associate Designer</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae a voluptate omnis praesentium nemo officiis aut
                  deleniti animi doloribus illum.
                </p>
              </div>
              <img src={level_6_associate}alt="" />
            </div>

            <div id="learning_5_7">
              <div>
                {" "}
                <p>Professional Level VII</p> <h3>Principal Designer</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae a voluptate omnis praesentium nemo officiis aut
                  deleniti animi doloribus illum.
                </p>
              </div>
              <img src={level_7_principal} alt="" />
            </div>

            <div id="learning_5_8">
              <div>
                {" "}
                <p>Professional Level VIII</p> <h3>Master Designer</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae a voluptate omnis praesentium nemo officiis aut
                  deleniti animi doloribus illum.
                </p>
              </div>
              <img src={level_8_master} alt="" />
            </div>

            <div id="learning_5_9">
              <div>
                {" "}
                <p>Professional Level IX</p> <h3>Authorized Expert</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae a voluptate omnis praesentium nemo officiis aut
                  deleniti animi doloribus illum.
                </p>
              </div>
              <img src={level_9_authorised_expert} alt="" />
            </div>
          </div>
        </section>
        <br />
        <br />
        <br />
        <br />
      </div>
    </main>
  );
};
export default HomeMain;
