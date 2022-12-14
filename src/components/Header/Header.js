import "./Header.scss";
import { NavLink, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import pldcpd from "../../images/pldcpd.png";
import { AsideAccountContext } from "../../context/AsideAccountContext.js";
import { AsideAccountButtonContext } from "../../context/AccountButtonContext.js";

const Header = () => {
  const [showMenue, setShowMenue] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const { buttonPos, setButtonPos } = useContext(AsideAccountButtonContext);
  const { showAccount, setShowAccount } = useContext(AsideAccountContext);
  useEffect(() => {
  console.log("buttonPosition:", buttonPos)
  })

  return (
    <>
      <header className="header">
        <nav className="navheader">
          <div id="dropdown">
            <button id="dropbtn">
              <p>
                <span className="C">C</span> about
              </p>
            </button>
            <ul id="dropdown-content">
              <li>
                <Link to="/home">
                  <span className="C">C</span> about
                </Link>
              </li>
              <li>
                <Link to="/abouttheprofession">
                  <span className="C">C</span> my Profession
                </Link>
              </li>
              <li>
                <Link to="/aboutpldcpd">
                  <span className="C">C</span> PLDCPD
                </Link>
              </li>
              <li>
                <Link to="/aboutrycerz">
                  <span className="C">C</span> RYCERZ
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="text_header">
          <Link to="/home">
            <img className="image_header" src={pldcpd} alt="" />
          </Link>

          <p>
            Plattform for Continuing <br />
            Professional Development
          </p>
        </div>

        <div id="header_myaccount">
          <ul>
            <li>
              <Link to="/RegisterLogin"> register </Link>
              <span className="C">C</span>
            </li>
            <li
              id="showlogin"
              onClick={() => {
                setLoggedIn(!loggedIn);
              
                loggedIn && showAccount === "hideAccount"
                ? setShowAccount("hideAccount")
                : setShowAccount("");

                if (loggedIn && showAccount === "hideAccount"){
                  setShowAccount("showAccount")
                } else if (!loggedIn && showAccount === "showAccount"){
                  setShowAccount("hideAccount")
                }

                
                if(!loggedIn && buttonPos === "buttonAccount") {
                  setButtonPos("buttonAccount showBut")
                } else if (loggedIn && buttonPos === "buttonAccount showBut") {setButtonPos("buttonAccount hideBut")
                } else if (!loggedIn && buttonPos === "buttonAccount hideBut") {setButtonPos("buttonAccount showBut")
                } else if (!loggedIn && buttonPos === "buttonAccount moveButtonBackToStart") {setButtonPos("buttonAccount showBut")
                } else if (loggedIn && buttonPos === "buttonAccount showBut moveButtonBack") {setButtonPos("buttonAccount hideBut")
                } else if (loggedIn && buttonPos === "buttonAccount showBut moveButton") {setButtonPos("buttonAccount moveButtonBackToStart")
                } else {setButtonPos("buttonAccount")
                }

                /* loggedIn
                  ? setButtonPos("buttonAccount hideBut")
                  : setButtonPos("buttonAccount showBut"); */
              }}
            >
              {loggedIn ? "log me out" : "log me in"}{" "}
              <span className="C">C</span>
            </li>
            <li className={loggedIn ? "" : "user"}>
              <Link to="/RegisterLogin">
                {" "}
                logged in as Joachim Ritter <span className="C">C</span>
              </Link>
            </li>
          </ul>
        </div>

        <div
          id="burger_button"
          className={showMenue ? "changeBurger" : ""}
          onClick={() => {
            setShowMenue(!showMenue);
          }}
        >
          <span></span>
        </div>
      </header>

      <nav id="navmain" className={showMenue ? "showNav" : " hideNav"}>
        <div>
          <ul>
            <p>
              main <br /> items
            </p>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> home
              </NavLink>
            </li>
            <li>
              <NavLink to="/abouttheprofession" className="closebtn">
                <span className="C">C</span> the profession
              </NavLink>
            </li>
            <li>
              <NavLink to="/404" className="closebtn">
                <span className="C">C</span> services
              </NavLink>
            </li>
            <li>
              <NavLink to="/404" className="closebtn">
                <span className="C">C</span> clients
              </NavLink>
            </li>
            <li>
              <NavLink to="/KnowledgeAccount" className="closebtn">
                <span className="C">C</span> your CPD account
              </NavLink>
            </li>
            <li>
              <NavLink to="/404" className="closebtn">
                <span className="C">C</span> contact
              </NavLink>
            </li>
            {/* <img src="./images/finger-print-outline.svg" alt="" /> */}
          </ul>
          <ul>
            <p>
              overview <br />
              of topics{" "}
            </p>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> home
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> learning
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> services
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> clients
              </NavLink>
            </li>
            <li>
              <NavLink to="/KnowledgeAccount" className="closebtn">
                <span className="C">C</span> your CPD account
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> contact
              </NavLink>
            </li>
          </ul>
          <ul>
            <p>
              overview <br />
              of sections{" "}
            </p>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> home
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> learning
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> services
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> clients
              </NavLink>
            </li>
            <li>
              <NavLink to="/KnowledgeAccount" className="closebtn">
                <span className="C">C</span> your CPD account
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> contact
              </NavLink>
            </li>
          </ul>
          <ul>
            <p>
              learning <br />
              by access
            </p>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> home
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> learning
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> services
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> clients
              </NavLink>
            </li>
            <li>
              <NavLink to="/KnowledgeAccount" className="closebtn">
                <span className="C">C</span> your CPD account
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> contact
              </NavLink>
            </li>
          </ul>
          <ul>
            <p>
              learning <br />
              by latest offers
            </p>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> home
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> learning
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> services
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> clients
              </NavLink>
            </li>
            <li>
              <NavLink to="/KnowledgeAccount" className="closebtn">
                <span className="C">C</span> your CPD account
              </NavLink>
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div id="navPromo">
          <p>direct registration</p>
        </div>
      </nav>
    </>
  );
};

export default Header;
