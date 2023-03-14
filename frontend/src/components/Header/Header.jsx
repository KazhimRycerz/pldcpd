import "./Header.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import pldcpd from "../../images/pldcpd.png";
import { SectionsContext } from "../../context/SectionsContext.js";

const Header = () => {
  const [showMenue, setShowMenue] = useState(false);
  //const { loggedIn } = useContext(SectionsContext);
  const { buttonPos, setButtonPos } = useContext(SectionsContext);
  const { asidePos, setAsidePos } = useContext(SectionsContext);
  const { goSite, setGoSite } = useContext(SectionsContext)
  const { isAuth } = useContext(SectionsContext);
  const { logout } = useContext(SectionsContext);
  const navigate = useNavigate;

  useEffect(() => {
  console.log("buttonPosition:", buttonPos)
  console.log("asidePos:", asidePos)
  console.log("isAuth", isAuth)
  })


  const manageLoginButton =()=> {
    isAuth && logout()
    !isAuth && asidePos === "accountAside showAccount"
      ? setAsidePos("accountAside hideAccount")
      : setAsidePos("accountAside");

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
  }

  const manageLinkToKnowledgeAccount =()=>{
    if (!isAuth) {setGoSite("/KnowledgeAccount"); navigate("/login")}
  }

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
                <NavLink to="/home">
                  <span className="C">C</span> about
                </NavLink>
              </li>
              <li>
                <NavLink to="/abouttheprofession">
                  <span className="C">C</span> my Profession
                </NavLink>
              </li>
              <li>
                <NavLink to="/aboutpldcpd">
                  <span className="C">C</span> PLDCPD
                </NavLink>
              </li>
              <li>
                <NavLink to="/aboutrycerz">
                  <span className="C">C</span> RYCERZ
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className="text_header">
          <NavLink to="/home">
            <img className="image_header" src={pldcpd} alt="" />
          </NavLink>

          <p>
            Plattform for Continuing <br />
            Professional Development
          </p>
        </div>

        <div id="header_myaccount">
          <ul>
            <li
            id="showregister">
              {!isAuth ? <Link to="/register"> register 
              <span className="C">C</span> </Link>: <span></span>}
              
            </li>
            <li
              id="showlogin"
              onClick={manageLoginButton}
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
            <li onClick={manageLinkToKnowledgeAccount}>
               <NavLink NavLink to="/KnowledgeAccount" className="closebtn">
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
              <NavLink to= "/KnowledgeAccount" className="closebtn">
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
