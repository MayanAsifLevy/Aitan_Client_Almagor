import React, { useState } from 'react'
import '../../receportsStyle.css'
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { useNavigate, Outlet } from "react-router-dom"


const ReportsReceiveMainPage = () => {

    const navigate = useNavigate();

    const [isReportClicked, setIsReportClicked] = useState(false)


    const handleDaily = () => {
        setIsReportClicked(true)
        navigate("dailyReportFilter/")
    }

    const handleMonthly = () => {
        setIsReportClicked(true)
        navigate("monthlyReportFilter/")
    }

    const handleSeasonly = () => {
        setIsReportClicked(true)
        navigate("seasonReportFilter/")
    }

    const handleSummary = () => {
        setIsReportClicked(true)
        navigate("summaryReportFilter/")
    }


    const handleAccumulatePlots = () => {
        setIsReportClicked(true)
        navigate("plotReportFilter/")
    }


    return (
        <div  >
            {/* ========= name ========== */}
            <div className="tableName">
                דוחות
            </div>

            <br /> <br />

            {/* ========= reports name ========== */}
            <div className='reportsContainer'>
                <div className="column">
                    <div className="buttonAndLabale">
                        <button className="iconButton" onClick={handleDaily}><HiOutlineDocumentReport /></button>
                        <label className="labelButton">דוח יומי</label>
                    </div>
                    <div className="buttonAndLabale">
                        <button className="iconButton" onClick={handleMonthly}><HiOutlineDocumentReport /></button>
                        <label className="labelButton">דוח חודשי</label>
                    </div>


                </div>
                <div className="column">
                    <div className="buttonAndLabale">
                        <button className="iconButton" onClick={handleSeasonly}><HiOutlineDocumentReport /></button>
                        <label className="labelButton">דוח עונתי</label>
                    </div>
                    <div className="buttonAndLabale">
                        <button className="iconButton" onClick={handleSummary}><HiOutlineDocumentReport /></button>
                        <label className="labelButton">דוח מרכז</label>
                    </div>
                </div>
                <div className="column">
                    <div className="buttonAndLabale">
                        <button className="iconButton" onClick={handleAccumulatePlots}><HiOutlineDocumentReport /></button>
                        <label className="labelButton">דוח צובר חלקות</label>
                    </div>


                </div>

                {/* <div className="column">

                    <div className="buttonAndLabale">
                        <button className="iconButton" onClick={handleAccumulatePlots}><HiOutlineDocumentReport /></button>
                        <label className="labelButton">דוח צובר חלקות</label> 
                    </div>

                </div> */}

            </div>

            <br />

            {/* ========= report filter ========== */}
            {isReportClicked && <div className='reportFilterContainer'>
                <Outlet />
            </div>
            }

        </div >
    )
}


export default ReportsReceiveMainPage