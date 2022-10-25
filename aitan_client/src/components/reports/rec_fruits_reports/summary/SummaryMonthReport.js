import React, { useEffect, useState } from 'react'
import GenericReport from '../../GenericReport';


function SummaryMonthlyReport() {

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


  const month = filetersFromReport.month
  const season = filetersFromReport.season

  const columns =
    [
      {
        Header: "פרי",
        accessor: "fruitName",
        width: "15%"
      },
      {
        Header: "מגדל",
        accessor: "growerName",
        width: "15%"
      },
      {
        Header: "משקל נטו (קג)",
        accessor: "weightNeto",
        width: "15%",
      },
      {
        Header: " משקל לתשלום (קג)",
        accessor: "total_weight_to_pay",
        width: "15%"
      },
      {
        Header: " תשלום (שח)",
        accessor: "payment",
        width: "15%",
      }
    ]


  //-------------------------------------------------
  const titleReport = 'דוח מרכז חודשי'

  const titles = [
    { titleHeb: 'חודש', value: month },
    { titleHeb: 'עונה', value: season }
  ]


  const rowProps = (row) => ({
    style: {
      background:
        row.original.growerName === '' ? '#AFACAB' : '',
      fontWeight:
        row.original.growerName === '' ? 'bold' : ''
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

export default SummaryMonthlyReport