import React from 'react'
import TableAggregation from '../general_comp/TableReports'
import logo from '../mainPage/logo.GIF'
import { useReactToPrint } from "react-to-print";

import moment from "moment";

function GenericReport(props) {

  const date_create = moment().format('LL')


  //-----------------  React-to-Print  -------------------------------

  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleOnBeforeGetContent = React.useCallback(() => {

    setLoading(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  //in case of saving the file as pdf - need to save it with datetime
  var d = new Date();
  var datestring = ("0" + d.getDate()).slice(-2) + "_" + ("0" + (d.getMonth() + 1)).slice(-2) + "_" +
    d.getFullYear() + "__" + ("0" + d.getHours()).slice(-2) + ("0" + d.getMinutes()).slice(-2);

  const t = `${props.titleReport}/${datestring}`;

  const handlePrint = useReactToPrint({
    content: reactToPrintContent,
    documentTitle: t,
    onBeforeGetContent: handleOnBeforeGetContent,

    removeAfterPrint: true
  });

  React.useEffect(() => {
    if (
      text === "New, Updated Text!" &&
      typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);


  //-------------------------------------------------

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
        <br />

        <br />

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