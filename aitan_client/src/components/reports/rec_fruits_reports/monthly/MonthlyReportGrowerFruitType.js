import React, { useEffect, useState } from 'react'
import GenericReport from '../../GenericReport';


function MonthlyReportGrower() {

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


  const growerName = filetersFromReport.growerName
  const month = filetersFromReport.month
  const season = filetersFromReport.season

  const columns =
    [
      {
        Header: "פרי",
        accessor: "fruitName",
        width: "8%"
      },
      {
        Header: "זן",
        accessor: "fruitType",
        width: "8%"
      },
      {
        Header: "אריזה",
        accessor: "packingType",
        // width: "8%"
      },
      {
        Header: "יחידות באריזה",
        accessor: "qtyInPacking",
        width: "15%"
      },
      {
        Header: "משקל ברוטו (קג) ",
        accessor: "weightBruto",
        width: "15%",
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
        // Cell: (row) => {
        //   return <span> {row.value} <span style= {{fontSize: '0.8rem'}}>שח</span></span>
        // }
      }
    ]

  //-------------------------------------------------
  const titleReport = 'דוח חודשי לפי מגדל-זן'

  const titles = [
    { titleHeb: 'שם מגדל', value: growerName },
    { titleHeb: 'חודש', value: month },
    { titleHeb: 'עונה', value: season }
  ]


  const rowProps = (row) => ({
    style: {
      background:
        row.original.weightBruto === '' ? 'black'
          : row.original.fruitType === '' && row.original.packingType === '' ? '#7F7E7E'
            : row.original.packingType !== '' && row.original.payment === null && row.original.dealName !== '' ? 'red'
              : row.original.packingType === '' ? '#AFACAB'
                : row.original.packingType !== '' && row.original.fruitType === '' ? '#E8E7E2'
                  : '',
      fontWeight:
        row.original.packingType === '' ? 'bold' : '',
      color:
        row.original.packingType.includes('סהכ') ? '#666564' : 'black'
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

export default MonthlyReportGrower