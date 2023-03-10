import "./Header.scss";
import { NavLink, Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import pldcpd from "../../images/pldcpd.png";
import { SectionsContext } from "../../context/SectionsContext.js";


const Header = () => {
  const [showMenue, setShowMenue] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(SectionsContext);
  const { buttonPos, setButtonPos } = useContext(SectionsContext);
  const { showAccount, setShowAccount } = useContext(SectionsContext);
  const { isAuth, setIsAuth } = useContext(SectionsContext);
  const { logout } = useContext(SectionsContext);
  useEffect(() => {
  console.log("loggedIn:", loggedIn);
  console.log("buttonPosition:", buttonPos)
  console.log("AccountPosition:", showAccount)
  console.log("isAuth", isAuth)
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
            <li
            id="showregister">
              {!isAuth  ? <Link to="/register"> register 
              <span className="C">C</span> </Link>: <span></span>}
              
            </li>
            {/* <li>
              <Link to="/login"> login </Link>
              <span className="C">C</span>
            </li> */}
            <li
              id="showlogin"
              onClick={() => {
                //setLoggedIn(!loggedIn);
                isAuth ? setIsAuth(false) : setIsAuth(true);
              
                isAuth && showAccount === "showAccount"
                  ? setShowAccount("hideAccount")
                  : setShowAccount("");
                isAuth ? setLoggedIn(true) : setLoggedIn(false)
                
                if (!isAuth && buttonPos === "") {setButtonPos("showBut") //ok
                } else if (isAuth && buttonPos === "showBut") {setButtonPos("hideBut") //ok
                } else if (!isAuth && buttonPos === "hideBut") {setButtonPos("showBut")
                } else if (isAuth && buttonPos === "showBut moveButton") {setButtonPos("moveButtonBackToStart")
                } else if (!isAuth && buttonPos === "moveButtonBackToStart") {setButtonPos("showBut")
               //  } else if (isAuth && buttonPos === "moveButtonBackToStart") {setButtonPos("showBut")
                } else if (isAuth && buttonPos === "showBut moveButtonBack") {setButtonPos("hideBut")
                } else if (!isAuth && buttonPos === "hideBut moveButton") {setButtonPos("hideBut")
                } else {setButtonPos("") 
                }

              }}
            >
              {isAuth ? <span> log me out </span> : <Link to="/login"> login </Link>}
              <span className="C">C</span>
            </li>
            <li className={isAuth ? "" : "user"}>
              <p>
                logged in as {localStorage.userName} <span className="C">C</span>
            </p>
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
