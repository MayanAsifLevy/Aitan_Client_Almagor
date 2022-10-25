import React, { useEffect, useState } from 'react'
import GenericReport from '../../GenericReport';
import moment from 'moment';


function PalletsWOinvoicesReport() {

  const [filetersFromReport, setFiletersFromReport] = useState([]);
  const [dataFroReport, setDataFroReport] = useState([]);



  useEffect(() => {
    const filterLocalStorage = localStorage.getItem('reportFilters');
    if (filterLocalStorage) {
      const obj = JSON.parse(filterLocalStorage)
      setFiletersFromReport(obj)
    }

  }, [localStorage.getItem('reportFilters')]);


  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('reportData');
    if (dataLocalStorage) {
      const obj = JSON.parse(dataLocalStorage);
      setDataFroReport(obj);
    }
  }, [localStorage.getItem('reportData')]);



  const fromDateFilter = moment(filetersFromReport.fromDateForReport).format('DD-MM-YYYY')
  const toDateFilter = moment(filetersFromReport.toDateForReport).format('DD-MM-YYYY')
  const traderName = filetersFromReport.traderName


  const columns =
    [
      {
        Header: "תאריך משלוח",
        accessor: "deliveryDate",
        width: "10%",
        tipText: "filter format: 08 Aug 2022",
        Cell: ({ value }) => { return moment(value).format('DD-MM-YYYY') }
      },
      {
        Header: "תעודת משלוח",
        accessor: "deliveryNoteNum",
        width: "15%"
      },
      {
        Header: "מספר משטח",
        accessor: "palletNum",
        width: "15%"
      },
      {
        Header: "פרי",
        accessor: "fruitName",
        width: "15%"
      },
      {
        Header: "זן",
        accessor: "fruitType",
        width: "15%"
      },
      {
        Header: "גודל",
        accessor: "size",
        width: "15%"
      },
      {
        Header: "איכות",
        accessor: "quality",
        width: "15%"
      },
    ]


  //-------------------------------------------------
  const titleReport = 'דוח משטחים ללא חשבונית'
  const titles = [
    { titleHeb: 'מתאריך', value: fromDateFilter },
    { titleHeb: 'עד תאריך', value: toDateFilter },
    { titleHeb: 'שם סוחר', value: traderName }

  ]


  const rowProps = (row) => ({
    style: {
      
    }
  })
  //-------------------------------------------------
  return (
    <div className='ContainerForReportOutput' >
      <GenericReport 
        reportColumns={columns} 
        reportdata={dataFroReport} 
        rowPropsReports={rowProps} 
        titles={titles} 
        titleReport={titleReport} />
    </div>
  )
}


export default PalletsWOinvoicesReport