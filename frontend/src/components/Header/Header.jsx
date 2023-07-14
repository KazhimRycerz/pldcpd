import "./Header.scss";
//import JoachimRitter from '../../images/Joachim_privat.jpg'
import { NavLink, Link} from "react-router-dom";
import { useContext, useState, useEffect} from "react";
import pldcpd from "../../images/pldcpd.png";
import CLogo from "../../images/C.png"
import { SectionsContext } from "../../context/SectionsContext.js";
import swal from "sweetalert"

const Header = () => {
  //const { loggedIn } = useContext(SectionsContext);
  const { isAuth, buttonPos, setButtonPos, asidePos, setAsidePos, gotoPage, setGotoPage, navigate, logout } = useContext(SectionsContext);
  const [showMenue, setShowMenue] = useState(false);
  const [accountListShow, setAccountListShow] = useState("");
  const [isToggled, setIsToggled] = useState (false)
  //const [selectedOptionAccount, setSelectedOptionAccount] = useState('');
  
  /*  const showDropdown =()=>{
    setAccountListShow("showAccountList");
  };
  const hideDropdown =()=>{
    setAccountListShow("hideAccountList");
  }; */

  const handleToggle =()=>{
    setIsToggled(!isToggled)
    isToggled === true ? setAccountListShow("showAccountList") : setAccountListShow("hideAccountList");
  }

  const handleOptionSelect = (option) => {
    navigate(option);
  };
  
  const manageAccountButton =()=> {
    isAuth && logout()
    !isAuth && asidePos === "accountAside showAccount"
    ? setAsidePos("accountAside hideAccount")
    : setAsidePos("accountAside");
    
           if (!isAuth && buttonPos === "") {setButtonPos("showBut") //ok
    } else if (!isAuth && buttonPos === "hideBut") {setButtonPos("showBut")
    } else if (!isAuth && buttonPos === "showBut") {setButtonPos("hideBut")
    } else if (!isAuth && buttonPos === "showBut moveButtonBack") {setButtonPos("hideBut")
    } else if (!isAuth && buttonPos === "hideBut moveButton") {setButtonPos("hideBut")
    } else if (!isAuth && buttonPos === "moveButtonBackToStart") {setButtonPos("showBut")
    } else if (isAuth && buttonPos === "showBut") {setButtonPos("hideBut") //ok
    } else if (isAuth && buttonPos === "showBut moveButton") {setButtonPos("moveButtonBackToStart")
    } else if (isAuth && buttonPos === "showBut moveButtonBack") {setButtonPos("hideBut")
    } else {setButtonPos("buttonZeroPosition") 
    }
    }

    /* useEffect(() => {
    console.log("buttonPosition:", buttonPos)
    console.log("asidePos:", asidePos)
    }, []) */

  return (
    <>
      <header >
        <div id="headerBox">
          <nav id="navheader">
            <div id="dropdown">
              <button id="dropbtn">
                <p>
                 about
                </p>
              </button>
              <ul id="dropdown-content">
                <li>
                  <NavLink to="/home">
                 about
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/abouttheprofession">
                 my Profession
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/aboutpldcpd">
                 PLDCPD
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/aboutrycerz">
                 RYCERZ
                  </NavLink>
                </li>
              </ul>
            </div>
          </nav>
  
          <div id="text_header">
            <NavLink to="/home">
              <img className="image_header" id="ClogolongHeader" src={pldcpd} alt="" />
            </NavLink>
            {/* <NavLink to="/home">
              <img id="ClogoHeader" src={CLogo} alt="" />
            </NavLink> */}
  
            <p>
              Plattform for Continuing <br />
              Professional Development
            </p>
          </div>
  
          <div id="header_myaccount">
            <ul>
              <li
              id="showregister">
                {!isAuth && <Link to="/register"> register 
                <span className="C">C</span> </Link> }
              </li>
              <li
                id="showlogin"
                onClick={manageAccountButton}
              >
                {isAuth ? <div> log me out <span className="C">C</span></div> : <Link to="/login"> login <span className="C">C</span></Link>}
                
              </li>
              {/* <li >
                {isAuth ? <Link to="/KnowledgeAccount">
                  logged in as {localStorage.userName} <span className="C">C</span> 
                  </Link> 
                :
                  <span></span>}
              </li> */}
              
              {isAuth ?
                <li id="dropBtnAccount" onMouseEnter={handleToggle} onClick={handleToggle}>
                  logged in as {localStorage.userName} <span className="C">C</span>
                </li>
                :
                <span></span>}
            </ul>
          </div>
        </div>
      </header>

  {isAuth && (
          <ul id="dropdownAccount" className={accountListShow} onMouseLeave={handleToggle}>
            <li onClick={() => handleOptionSelect("/KnowledgeAccount")}>Knowledge Status <span className="C">C</span></li>
            <li onClick={() => handleOptionSelect("/KnowledgeAccount")}>Personal Data <span className="C">C</span></li>
            <li onClick={() => handleOptionSelect("/KnowledgeAccount")}>Money: your budget <span className="C">C</span></li>
            <li onClick={() => handleOptionSelect("/userupdate")}>change your personal data <span className="C">C</span></li>
          <p>rufen sie hier Ihre persönliche Daten auf!</p>
          </ul>
      )}    
      
        <div
          id="burger_button"
          className={showMenue ? "changeBurger" : ""}
          onClick={() => {
            setShowMenue(!showMenue);
          }}
          >
          <span></span>
        </div>

      <nav onMouseLeave={(event)=>{setShowMenue(!showMenue)}}  id="navmain" className={showMenue ? "showNav" : " hideNav"}>
        <div id="listOfFields">
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
              <NavLink to="/abouttheprofession" style={{color: "red"}} className="closebtn">
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
              {isAuth ? (
                <NavLink to="/KnowledgeAccount" style={{color: "red"}}>
              <span className="C">C</span> your CPD account
            </NavLink>
              ) : (
                <NavLink style={{color: "red"}}
                //to="/login"
                onClick={() => {
                  swal("Du musst registriert und angemeldet sein, um deinen Account sehen zu können.", {
                    buttons: {
                      login: "ja, bitte einloggen!",
                      backtomain: "nein, zurück zur Hauptseite"}
                    })
                    .then ((value)=>{
                      switch(value) {
                        case "login":
                          setGotoPage("/KnowledgeAccount")
                          navigate("/login")
                          break;
                          case "backtomain":
                            setShowMenue(!showMenue)
                            navigate("/home")
                            break;
                            default:
                              swal("Got away safely!");
                            }
                          })
                          //setGotoPage("/KnowledgeAccount");
                          navigate(gotoPage);
                        }}
                        >
                <span className="C">C</span> your CPD account
              </NavLink>
            )}
            </li>
            <li>
              {isAuth ? (
                <NavLink to="/userupdate" style={{color: "red"}}>
              <span className="C">C</span> change your User Data
            </NavLink>
              ) : (
                <NavLink style={{color: "red"}}
                //to="/login"
                onClick={() => {
                  swal("Du musst registriert und angemeldet sein, um deinen Account sehen zu können.", {
                    buttons: {
                      login: "ja, bitte einloggen!",
                      backtomain: "nein, zurück zur Hauptseite"}
                    })
                    .then ((value)=>{
                      switch(value) {
                        case "login":
                          setGotoPage("/userupdate")
                          navigate("/login")
                          break;
                      case "backtomain":
                        setShowMenue(!showMenue)
                        navigate("/home")
                        break;
                        default:
                          swal("Got away safely!");
                        }
                      })
                      //setGotoPage("/KnowledgeAccount");
                      navigate(gotoPage);
                    }}
                    >
                <span className="C">C</span> change your Userdata
              </NavLink>
            )}
            </li>
            <li>
              <NavLink to="/emailus" className="closebtn" style={{color: "red"}}>
                <span className="C">C</span> e-mail us 
              </NavLink>
            </li>
            <li>
              <NavLink to="/404" className="closebtn">
                <span className="C">C</span> contact us 
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
              <NavLink to="/coursepage" className="closebtn" style={{color: "red"}}>
                <span className="C">C</span> single course
              </NavLink>
            </li>
            <li>
            <NavLink to="/courselistpage" className="closebtn" style={{color: "red"}}>
                <span className="C">C</span> listed courses on offer
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
            {isAuth && <NavLink to="/KnowledgeAccount" className="closebtn">
                <span className="C">C</span> your CPD account
              </NavLink>}
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
            {isAuth && <NavLink to="/KnowledgeAccount" className="closebtn">
                <span className="C">C</span> your CPD account
              </NavLink>}
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
            {isAuth && <NavLink to="/KnowledgeAccount" className="closebtn">
                <span className="C">C</span> your CPD account
              </NavLink>}
            </li>
            <li>
              <NavLink to="/home" className="closebtn">
                <span className="C">C</span> contact
              </NavLink>
            </li>
          </ul>
        </div>
        <div id="navPromo">
          <NavLink to="/register" id="nlPromo">
          <p>direct registration</p>
          </NavLink>
        </div>
      </nav>

              
    </>
  );
};

export default Header;
