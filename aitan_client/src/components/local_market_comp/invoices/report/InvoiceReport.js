import React, { useEffect, useState } from 'react'

import moment from 'moment';
import { useReactToPrint } from "react-to-print";
import logo from '../../../mainPage/logo.GIF'
import TableAggregation from '../../../general_comp/TableReports'


function InvoiceReport() {

  const titleReport = 'פירוט חשבונית'

  //********************* React-to-Print ************************************************/

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

  const t = `${titleReport}/${datestring}`;

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


 
  //**************************************************************************************/
  const [filetersFromReport, setFiletersFromReport] = useState([]);
  const [datainvoiceLines, setDatainvoiceLines] = useState([]);
  const [dataPalletCost, setDataPalletCost] = useState([]);
  const [dataResellerInfo, setDataResellerInfo] = useState([]);


  const date_create = moment().format('LL')

  useEffect(() => {
    const filterLocalStorage = localStorage.getItem('reportFilters');
    if (filterLocalStorage) {
      const obj = JSON.parse(filterLocalStorage)
      setFiletersFromReport(obj)
    }

  }, [localStorage.getItem('reportFilters')]);


  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('invoiceLinesFilter');

    if (dataLocalStorage) {
      const obj = JSON.parse(dataLocalStorage);
      setDatainvoiceLines(obj);
    }
  }, [localStorage.getItem('invoiceLinesFilter')]);


  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('palletCostFilter');

    if (dataLocalStorage) {
      const obj = JSON.parse(dataLocalStorage);
      setDataPalletCost(obj);
    }
  }, [localStorage.getItem('palletCostFilter')]);


  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('resellerInfoFilter');

    if (dataLocalStorage) {
      const obj = JSON.parse(dataLocalStorage);
      setDataResellerInfo(obj);
    }
  }, [localStorage.getItem('resellerInfoFilter')]);


  //**************************************************************************************/
  const invoiceNum = filetersFromReport.invoiceNum
  const traderName = filetersFromReport.traderName
  const dateFilter = moment(filetersFromReport.invoiceDate).format('DD-MM-YYYY')


  // ************* in order to find the total invoice ***********************************/
  const filterRecordLines = datainvoiceLines.filter((item) => item.fruitName === 'סהכ שורות')
  const lineTotalLines = filterRecordLines.length !== 0 ? parseFloat(filterRecordLines[0].total) : 0

  const filterRecordPallets = dataPalletCost.filter((item) => item.palletType === 'סהכ עלות משטחים')
  const lineTotalPallet = filterRecordPallets.length !== 0 ? parseInt(filterRecordPallets[0].total) : 0


  const lineTotalReseller = dataResellerInfo.length !== 0 ? parseInt(dataResellerInfo[0].total_reduction_fee) : 0


  const totalInvoice = (lineTotalLines + lineTotalPallet + lineTotalReseller).toLocaleString()

  //**************************************************************************************/

  const titles = [
    { titleHeb: 'מספר חשבונית', value: invoiceNum },
    { titleHeb: 'שם סוחר', value: traderName },
    { titleHeb: 'תאריך משלוח', value: dateFilter }
  ]

 //**************************************************************************************/
  //                  invoiceLines
 //**************************************************************************************/
  const columns_invoiceLines =
    [
      {
        Header: "פרי",
        accessor: "fruitName",
      },
      {
        Header: "זן",
        accessor: "fruitType",
      },
      {
        Header: "גודל",
        accessor: "size",
      },
      {
        Header: "איכות",
        accessor: "quality",
      },
      {
        Header: "מספר משטח",
        accessor: "palletNum",
      },

      {
        Header: "תאריך שילוח",
        accessor: "deliveryDate",
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { if (value !== '') { return moment(value).format('DD-MM-YYYY') } }
      },
      {
        Header: "תעודת משלוח",
        accessor: "deliveryNoteNum",
      },
      {
        Header: "מחיר סגור",
        accessor: "closePrice",
      },
      {
        Header: "משקל סגור",
        accessor: "closeWeight",
        Cell: ({ value }) => { if (value !== null) { return parseInt(value).toLocaleString() } }
      },
      {
        Header: "סהכ עלות תוצרת",
        accessor: "total",
        Cell: ({ value }) => { if (value !== null) { return parseInt(value).toLocaleString() } }
      }
    ]

  //**************************************************************************************/

  const rowProps_invoiceLines = (row) => ({
    style: {
      background:
        row.original.fruitName === 'סהכ שורות' ? '#7F7E7E'
          : row.original.closeWeight === null && row.original.closePrice === null && row.original.size !== '' ? 'red'
            : row.original.fruitType !== '' && row.original.size === '' ? '#E8E7E2'
              : row.original.fruitType === '' ? '#AFACAB'
                : '',
      fontWeight:
        row.original.size === '' ? 'bold' : '',

    }
  })

 
  //**************************************************************************************/
  //                palletCost
  //**************************************************************************************/
  const columns_palletCost =
    [
      {
        Header: "סוג משטח",
        accessor: "palletType",
        width: "20%"
      },
      {
        Header: "מספר משטח",
        accessor: "palletNum",
        width: "20%"
      },
      {
        Header: "עלות משטח",
        accessor: "palletMatCost",
        width: "15%"
      },
      {
        Header: "מעמ",
        accessor: "VAT",
        width: "15%"
      },
      {
        Header: "עלות משטחים פיזיים",
        accessor: "total",
        width: "10%",
        Cell: ({ value }) => { if (value !== null) { return parseFloat(value).toLocaleString() } }
      }
    ]
  
  //**************************************************************************************/

  const rowProps_palletCost = (row) => ({
    style: {
      background:
        row.original.palletType === 'סהכ עלות משטחים' ? '#7F7E7E'
          : row.original.palleType !== '' && row.original.palletNum === '' ? '#AFACAB'
            : '',
      fontWeight:
        row.original.palletMatCost === '' ? 'bold' : '',

    }
  })

 
  //**************************************************************************************/
  //            Reseller Info
  //**************************************************************************************/
  const columns_resellerInfo =
    [
      {
        Header: "עמלת משווק",
        accessor: "reseller_prct",
        width: "20%"
      },
      {
        Header: "סהכ עלות משווק",
        accessor: "total_reseller_fee",
        width: "20%",
        Cell: ({ value }) => { if (value !== null) { return parseFloat(value).toLocaleString() } }
      },
      {
        Header: "מעמ",
        accessor: "total_vat_cost",
        width: "15%",
        Cell: ({ value }) => { if (value !== null) { return parseFloat(value).toLocaleString() } }
      },
      {
        Header: "ניכוי עמלת משווק",
        accessor: "total_reduction_fee",
        width: "15%",
        Cell: ({ value }) => { if (value !== null) { return parseFloat(value).toLocaleString() } }
      }
    ]
 
  //**************************************************************************************/

  const rowProps_resellerInfo = (row) => ({
    style: {
      background:
        row.original.reseller_prct !== '' ? '#7F7E7E'
          // : row.original.fruitType !== '' && row.original.size=== '' ?  '#E8E7E2' 
          //   : row.original.fruitType === '' ? '#AFACAB'
          : '',
      fontWeight:
        row.original.reseller_prct !== '' ? 'bold' : '',

    }
  })

  
  //**************************************************************************************/

  return (
    <div className='ContainerForReportOutput' >
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
                {titleReport}

                <br />

                <div className="tableParams">
                  {titles.map((t, i) => {
                    return (<div key={i}> {t.titleHeb}: <span style={{ fontWeight: "bold" }}>{t.value}</span></div>)
                  }) }
                </div>

              </div>

            </div>

          </div>
          <br />

          <br />

          <div className='tableData' style={{ paddingRight: '5%', paddingLeft: '5%' }}  >
            <TableAggregation
              columns={columns_invoiceLines}
              data={datainvoiceLines}
              rowProps={rowProps_invoiceLines}
            />
          </div>

          <br />
          <div className='tableData' style={{ paddingRight: '5%', paddingLeft: '5%' }}  >
            <TableAggregation
              columns={columns_palletCost}
              data={dataPalletCost}
              rowProps={rowProps_palletCost}
            />
          </div>

          <br />

          <div className='tableData' style={{ paddingRight: '5%', paddingLeft: '5%' }}  >
            <TableAggregation
              columns={columns_resellerInfo}
              data={dataResellerInfo}
              rowProps={rowProps_resellerInfo}
            />
          </div>

          <br /><br />

          <div>
            <h2 style={{ fontWeight: 'bold', textAlign: 'center', color: 'white', backgroundColor: 'black' /*'#AFACAB'*/, border: '1px solid black' }}> סהכ חשבונית:  {totalInvoice} שח</h2>
          </div>

          <br /> <br />

          <div className='printDate' >
            <span >{date_create} </span>
            <span> בית אריזה "איתן" אלמגור</span>
          </div>

        </div>

      </div>
    </div>

  )
}

export default InvoiceReport