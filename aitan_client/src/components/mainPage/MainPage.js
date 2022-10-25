import React from "react";
import { useNavigate, Outlet } from "react-router-dom"
import "./mainPageStyle.css"
import logo from "./logoInPages.GIF"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReceiveTableUpdates from "./tables_updates/Rec_Table_Updates";
import LocalTableInfra from "./tables_updates/Local_Table_Infra";
import { saveSectionNamePerUser, clickLogOut } from "../../redux/mainPage/general_actions"
import Popup from "../general_comp/popUps/Popup"
import LocalTableAction from "./tables_updates/Local_Table_action";
import { loadFixedInfo } from "../../redux/local_market_actions/fixedInfo/fixedInfo_actions"
import { MdModeEdit } from 'react-icons/md';

const MainPageComp = () => {

  let dispatch = useDispatch();
  const navigate = useNavigate();

  let _token = useSelector(state => state.login.Token.token)

  let selected_season = useSelector(state => state.general.season)
  selected_season = (selected_season === "" ? new Date().getFullYear() : selected_season)

  let VAT = useSelector(state => state.general.VAT)
  let traderPrcnt = useSelector(state => state.general.traderPrcnt)
  let distributerPrcnt = useSelector(state => state.general.distributerPrcnt)

  // in order to save the VAT, and other fixedInfo

  useEffect(() => {
    if (VAT === 0 || traderPrcnt === 0 || distributerPrcnt === 0) { dispatch(loadFixedInfo(_token)) }

  }, [])


  const [selected, setSelected] = useState(null);
  const items = ["קבלת פרי", "שוק מקומי"];
  const [updateIsOpen, setUpdateIsOpen] = useState(false)
  const [actionIsOpen, setActionIsOpen] = useState(false)
  const [popUp, setPopUp] = useState(false)


  const sectionName = useSelector((state) => state.general.sectionName);


  const selectedHandler = (itemName) => {
    setSelected(itemName)
    switch (itemName) {

      case "קבלת פרי":
        dispatch(saveSectionNamePerUser("rec_fruit"))
        return navigate("receiveFruits/")

      case "שוק מקומי":
        dispatch(saveSectionNamePerUser("local_market"))
        return navigate("createPallet/")

      case "logOut":
        dispatch(clickLogOut())
        return navigate("../")

      default:
        return ""
    }
  }


  const updatesHandler = () => {
    setUpdateIsOpen(!updateIsOpen)
    setPopUp(!popUp)
  }

  const actionsHandler = () => {
    setPopUp(!popUp)
    setActionIsOpen(!actionIsOpen)
  }

  const reportHandler = (sectionName) => {
    setPopUp(!popUp)
    switch (sectionName) {
      case "rec_fruit":
        return navigate("reportsReceiveMain/")

      case "local_market":
        return navigate("reportsLocalMain/")

      default:
        return ""
    }
  }

  const handleSeasonEdit = () => {
    navigate("/seasonSelect")
  }

  return (
    <div className="mainPageContainer">

      <div className="container navContainer">
        <div className="img_seasson">

          <div className="div_imp" >
            <img src={logo} className="logo" alt="aitanLogo" />
          </div>

          <div className="navButton season seasonEdit" >
            עונה: {selected_season}
            <button className='iconButton' onClick={() => handleSeasonEdit()}><MdModeEdit /></button>
          </div>

        </div>

        <div className="navContainerButtons_titles">
          {
            items.map(item => {
              return <input type="button" className="navButton title_button" key={item} onClick={() => selectedHandler(item)}
                style={{ color: item === selected ? "#f7ab61" : "" }} value={item} />
            })
          }
        </div>

        <div className="logOutContainer">
          <input type="button" className="navButton logout" key={"logOut"} onClick={() => selectedHandler("logOut")} value={"יציאה"} />
        </div>
      </div>

      <div className="subMainPage">

        <div className="extraOptions" style={{ height: "89vh" }}>
          {/* ========== once clicking on the updatesHandler => the popUP changes to true ===========  */}
          <input type="button" className="navButton" value={sectionName !== "" ? "תשתית" : ""/*(sectionName === "local_market" ? "תהליך" : "")*/} onClick={updatesHandler} />
          <br />
          {sectionName === "rec_fruit" && updateIsOpen && <ReceiveTableUpdates />}
          {sectionName === "local_market" && updateIsOpen && <LocalTableInfra />}



          {/* in case the user didnt select section before he clicked on the "updates" button */}
          {/* once clicking on the  close of the popup - the setPopup changed back to false*/}

          {sectionName === "" &&
            <Popup trigger={popUp} setTrigger={setPopUp}>
              <div className="popupMessage"> ראשית יש לבחור איזור עבודה</div>
            </Popup>
          }

          <br />

          <input type="button" className="navButton" value={sectionName === "local_market" ? "פעולות" : ""/*(sectionName === "local_market" ? "דוחות" : "")*/} onClick={actionsHandler} />
          <br />
          {sectionName === "local_market" && actionIsOpen && <LocalTableAction />}

          <br />

          <input type="button" className="navButton" value={sectionName !== "" ? "דוחות" : ""/*(sectionName === "local_market" ? "דוחות" : "")*/} onClick={() => reportHandler(sectionName)} />
          <br />

        </div>

        <div className="detailsPage">
          <Outlet />
        </div>
      </div>

    </div>
  );
}

export default MainPageComp;
