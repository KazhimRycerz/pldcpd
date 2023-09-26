import React, { useState, useEffect, useContext } from "react";
import { SectionsContext } from "../../context/SectionsContext.js";
import { EditOutlined, SaveOutlined, CancleOutlined } from "@ant-design/icons";
import axiosConfig from "../../util/axiosConfig";
import Swal from "sweetalert2";
import "./UserUpdateMain.scss";

export default function UpdateUser() {
  const { userData, setUserData, navigate, gotoPage, setGotoPage } = useContext(SectionsContext);
  const [contactData, setContactData] = useState({});
  const userId = localStorage.getItem("userId");

  const [refreshData, setRefreshData] = useState({});
  const [editUserName, setEditUserName] = useState(false);
  const [editFirstName, setEditFirstName] = useState(false);
  const [editLastName, setEditLastName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPassword, setEditPassword] = useState(false);
  //const [editDisabilities, setEditDisabilities] = useState(false);
  //const [editLocation, setEditLocation] = useState(false);
  //const [editGender, setEditGender] = useState(false);

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [location, setLocation] = useState("");
  //const [disabilities, setDisabilities] = useState("");
  //const [gender, setGender] = useState("");
  //const [genderName, setGenderName] = useState("");

  const [editInputName, setEditInputName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /* const genderRender = () => {
    let gender;
    switch (userData.gender) {
      case "female":
        gender = "weiblich";
        break;
      case "male":
        gender = "männlich";
        break;
      case "diverse":
        gender = "nicht Binär";
        break;
      case "none":
        gender = "keine Angabe";
        break;
    } 

    return gender;
  };*/

  const getUserData = () => {
    const getUserById = async () => {
      const axiosResp = await axiosConfig.get(
        `http://localhost:4000/user/${userId}`
      );
      const userData = axiosResp.data;
      //const contactDetails = userData.contactData;
      setUserData(userData);
      //setContactData(contactDetails);
    };
    getUserById();
    console.log(userData)
    //console.log(contactData)
  };
  useEffect(() => {
    setGotoPage("/userupdate")
    getUserData();
  }, []);

  const handleErrorMessage = (data) => {
    switch (data) {
      case "Benutzername":
        setErrorMessage(
          "Ihr Benutzername muss zwischen 4 und 20 Zeichen lang sein"
        );
        break;
      case "Email":
        setErrorMessage("Geben Sie bitte eine gültige Email-Adresse ein");
        break;
      case "Passwort":
        setErrorMessage(
          "Ihr Passwort muss mindestens 8 Zeichen lang sein und eine Zahl, einen Groß- und einen Kleinbuchstaben enthalten."
        );
        break;
      case "Vorname":
        setErrorMessage("Bitte geben Sie Ihren Vornamen ein");
        break;
      case "Nachname":
        setErrorMessage("Bitte geben Sie ihren Nachnamen ein");
        break;
      case "Wohnort":
        setErrorMessage("Bitte geben Sie Ihre Stadt ein");
        break;
      default:
        setErrorMessage("");
        break;
    }
  };

   const updateUser = async (data) => {
    try {
      const axiosResp = await axiosConfig.patch(
        `/user/edit/${localStorage.getItem("userId")}`,
        data
      );
      setRefreshData(axiosResp.data);
      Swal.fire.fire({
        title: `${editInputName} erfolgreich geändert!!`,
        icon: "success",
      });
      refreshData ? getUserData() : getUserData();
      setEditUserName(false);
      setEditFirstName(false);
      setEditLastName(false);
      setEditEmail(false);
      setEditPassword(false);
      
    } catch (error) {
      Swal.fire({
        title: "Da ist ein Fehler aufgetreten.",
        text: errorMessage,
        icon: "error",
      });
      setEditUserName(false);
      setEditFirstName(false);
      setEditLastName(false);
      setEditEmail(false);
      setEditPassword(false);
      console.log(error);
    }
  };

  const updateUserPassword = async (data) => {
    try {
      const axiosResp = await axiosConfig.patch(
        `/user/password/${localStorage.getItem("userId")}`,
        data
      );
      setRefreshData(axiosResp.data);
      Swal.fire({
        title: `${editInputName} erfolgreich geändert!!`,
        icon: "success",
      });
      refreshData ? getUserData() : getUserData();
      setEditPassword(false);
    } catch (error) {
      Swal.fire({
        title: "Da ist ein Fehler aufgetreten.",
        text: errorMessage,
        icon: "error",
      });
      setEditPassword(false);
      console.log(error);
    }
  };

  return (
    <main id="updateMain">
      <div id="UpdateUser">
        <h2>Benutzerdaten Aktualisieren</h2>
         <ul>
          <li>
            <span className="col1">Benutzername: </span>
            <span className="col2">
              {!editUserName ? (
                <span>{userData.userName}</span>
              ) : (
                <input
                  type="text"
                  defaultValue={userData.userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              )}
                {!editUserName ? (
                  <EditOutlined
                    className="edit-icon"
                    onClick={() => {
                      setEditUserName(true);
                      setEditInputName("Benutzername");
                      handleErrorMessage("Benutzername");
                    }}
                  />
                ) : (
                  <SaveOutlined
                    className="save-icon"
                    onClick={() => {
                      if (!userName) {
                        Swal.fire({ title: "Benutzername unverändert!" });
                        setEditUserName(false);
                      } else {
                        Swal.fire({
                          title: "Benutzername ändern?",
                          text: userName,
                          icon: "warning",
                          buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                          dangerMode: true,
                        }).then((isConfirm) => {
                          if (isConfirm) {
                            const data = {
                              userName: userName,
                              firstName: userData.firstName,
                              lastName: userData.lastName,
                              email: userData.eMail
                            };
                            updateUser(data);
                          } else {
                            Swal.fire({ title: "Benutzername ändern abgebrochen." });
                            setEditUserName(false);
                          }
                        });
                      }
                      getUserData();
                    }}
                  />
                )}
            </span>
          </li>
          <li>
            <span className="col1">Vorname: </span>
            <span className="col2">
              {!editFirstName ? (
                <span>{userData.firstName}</span>
              ) : (
                <input
                  type="text"
                  defaultValue={userData.firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              )}
              {!editFirstName ? (
                <EditOutlined
                className="edit-icon"
                  onClick={() => {
                    setEditFirstName(true);
                    setEditInputName("Vorname");
                    handleErrorMessage("Vorname");
                  }}
                />
              ) : (
                <SaveOutlined
                className="save-icon"
                  onClick={() => {
                    if (!firstName) {
                      Swal.fire({ title: "Vorname unverändert!" });
                      setEditFirstName(false);
                    } else {
                      Swal.fire({
                        title: "Vorname ändern?",
                        text: firstName,
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
                          const data = {
                            userName: userData.userName,
                            firstName: firstName,
                            lastName: userData.lastName,
                            //gender: userData.gender,
                            //disabilities: userData.disabilities,
                            email: userData.eMail,
                            //location: userData.location,
                          };
                          updateUser(data);
                        } else {
                          Swal.fire({ title: "Vorname ändern abgebrochen." });
                          setEditFirstName(false);
                        }
                      });
                    }
                    getUserData();
                  }}
                />
              )}
            </span>
          </li>
          <li>
            <span className="col1">Nachname: </span>
            <span className="col2">
              {!editLastName ? (
                <span>{userData.lastName}</span>
              ) : (
                <input
                  type="text"
                  defaultValue={userData.lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              )}
                {!editLastName ? (
                  <EditOutlined
                    className="edit-icon"
                    onClick={() => {
                      setEditLastName(true);
                      setEditInputName("Nachname");
                      handleErrorMessage("Nachname");
                    }}
                  />
                ) : (
                  <SaveOutlined
                    className="save-icon"
                    onClick={() => {
                      if (!lastName) {
                        Swal.fire({ title: "Nachname unverändert!" });
                        setEditLastName(false);
                      } else {
                        Swal.fire({
                          title: "Nachname ändern?",
                          text: lastName,
                          icon: "warning",
                          buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                          dangerMode: true,
                        }).then((isConfirm) => {
                          if (isConfirm) {
                            const data = {
                              userName: userData.userName,
                              firstName: userData.firstName,
                              lastName: lastName,
                              //gender: userData.gender,
                              //disabilities: userData.disabilities,
                              email: userData.eMail,
                              //location: userData.location,
                            };
                            updateUser(data);
                          } else {
                            Swal.fire({ title: "Nachname ändern abgebrochen." });
                            setEditLastName(false);
                          }
                        });
                      }
                      getUserData();
                    }}
                  />
                )}
            </span>
          </li>
          {/*
          <li>
            <span className="col1">Wohnort: </span>
            <span className="col2">
              {!editLocation ? (
                <span>{userData.location}</span>
              ) : (
                <input
                  type="text"
                  defaultValue={userData.location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              )}
                {!editLocation ? (
                  <EditOutlined
                    className="edit-icon"
                    onClick={() => {
                      setEditLocation(true);
                      setEditInputName("Wohnort");
                      handleErrorMessage("Wohnort");
                    }}
                  />
                ) : (
                  <SaveOutlined
                    className="save-icon"
                    onClick={() => {
                      if (!location) {
                        Swal.fire({ title: "Wohnort unverändert!" });
                        setEditLocation(false);
                      } else {
                        Swal.fire({
                          title: "Wohnort ändern?",
                          text: location,
                          icon: "warning",
                          buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                          dangerMode: true,
                        }).then((isConfirm) => {
                          if (isConfirm) {
                            const data = {
                              userName: userData.userName,
                              firstName: userData.firstName,
                              lastName: userData.lastName,
                              gender: userData.gender,
                              disabilities: userData.disabilities,
                              email: userData.email,
                              location: location,
                            };
                            updateUser(data);
                            localStorage.setItem(
                              "defSearch",
                              location.toLowerCase()
                            );
                          } else {
                            Swal.fire({ title: "Wohnort ändern abgebrochen." });
                            setEditLocation(false);
                          }
                        });
                      }
                      getUserData();
                    }}
                  />
                )}
            </span>
                  </li>*/}
          <li>
            <span className="col1">Email: </span>
            <span className="col2">
              {!editEmail ? (
                <span>{userData.eMail}</span>
              ) : (
                <input
                  type="text"
                  defaultValue={userData.eMail}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )}
                {!editEmail ? (
                  <EditOutlined
                    className="edit-icon"
                    onClick={() => {
                      setEditEmail(true);
                      setEditInputName("Email");
                      handleErrorMessage("Email");
                    }}
                  />
                ) : (
                  <SaveOutlined
                    className="save-icon"
                    onClick={() => {
                      if (!email) {
                        Swal.fire({ title: "Email unverändert!" });
                        setEditEmail(false);
                      } else {
                        Swal.fire({
                          title: "Email ändern?",
                          text: email,
                          icon: "warning",
                          buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                          dangerMode: true,
                        }).then((isConfirm) => {
                          if (isConfirm) {
                            const data = {
                              userName: userData.userName,
                              firstName: userData.firstName,
                              lastName: userData.lastName,
                              //gender: userData.gender,
                              //disabilities: userData.disabilities,
                              email: email,
                              //location: userData.location,
                            };
                            updateUser(data);
                          } else {
                            Swal.fire({ title: "Email ändern abgebrochen." });
                            setEditEmail(false);
                          }
                        });
                      }
                      getUserData();
                    }}
                  />
                )}
            </span>
          </li>
          <li>
            <span className="col1">Passwort</span>
            <span className="col2">
            {!editPassword ? (
              <button
                className="buttonBasics"
                onClick={() => {
                  setEditPassword(true);
                  setEditInputName("Passwort");
                  handleErrorMessage("Passwort");
                }}
              >
                Passwort ändern
              </button>
            ) : (
              <input
                type="password"
                className="col1"
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
              
              {!editPassword ? null : (
                <SaveOutlined
                  className="save-icon"
                  onClick={() => {
                    if (!password) {
                      Swal.fire({ title: "Passwort unverändert!" });
                      setEditPassword(false);
                    } else {
                      Swal.fire({
                        title: "Passwort ändern?",
                        icon: "warning",
                        buttons: ["Nein, nicht ändern!", "Ja, ändern!"],
                        dangerMode: true,
                      }).then((isConfirm) => {
                        if (isConfirm) {
                          const data = {
                            userName: userData.userName,
                            firstName: userData.firstName,
                            lastName: userData.lastName,
                            //gender: userData.gender,
                            //disabilities: userData.disabilities,
                            email: userData.eMail,
                            //location: userData.location,
                            password: password,
                          };
                          updateUserPassword(data);
                        } else {
                          Swal.fire({ title: "Passwort ändern abgebrochen." });
                          setEditPassword(false);
                        }
                      });
                    }
                    getUserData();
                  }}
                />
                )}
                
            </span>
          </li>
        </ul> 
          <button onClick={() => navigate(-1)} className="buttonBasics" >
            Fertig
          </button>
      </div>
    </main>
  ); 
}
