import React from 'react'
import TableAggregation from '../../../general_comp/TableReports'
import logo from '../../../mainPage/logo.GIF'


import moment from "moment";

function GenericReport(props) {

  const date_create = moment().format('LL')


  return (
    <div  >

      {loading && <p className="indicator" style={{ color: 'red' }}> Loading...</p>}
      <button onClick={handlePrint}>
        Print
      </button>



      <div ref={componentRef}>
        <div className='logoInReportContainer'>
          <img src={logo} className='logoInReport' alt="My logo" />
        </div>
        <div className="reportOutputTitleContainer">

          <div className="titleInfoContainer">

            <div className="tableName">
              {props.titleReport}

              <br />

              <div className="tableParams">

                {props.titles.map((t, i) => {
                  return (<div key={i}> {t.titleHeb}: <span style={{ fontWeight: "bold" }}>{t.value}</span></div>)
                })
                }
              </div>

            </div>
          </div>
        </div>

        <br /> <br />

        <div className='tableData aggregation' >
          <TableAggregation
            columns={props.reportColumns}
            data={props.reportdata}
            rowProps={props.rowPropsReports}
          />
        </div>

        <div className='printDate' >
          <span >{date_create} </span>
          <span> בית אריזה "איתן" אלמגור</span>
        </div>

      </div>

    </div>

  )
}

export default GenericReport