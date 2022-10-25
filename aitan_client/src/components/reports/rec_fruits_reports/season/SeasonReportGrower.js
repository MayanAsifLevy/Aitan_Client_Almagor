import React, { useEffect, useState } from 'react'
import GenericReport from '../../GenericReport';


function SeasonReportGrower() {

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
  const season = filetersFromReport.season


  const columns =
    [
      {
        Header: "פרי",
        accessor: "fruitName",
        width: "6%"
      },
      {
        Header: "זן",
        accessor: "fruitType",
        width: "9%"
      },
      {
        Header: "עסקה",
        accessor: "dealName",
        width: "10%"
      },
      {
        Header: "אריזה",
        accessor: "packingType",
        width: "11%"
      },
      {
        Header: "יחידות באריזה",
        accessor: "qtyInPacking",
        width: "12%"
      },
      {
        Header: " משקל לתשלום (קג)",
        accessor: "total_weight_to_pay",
        width: "15%"
      },
      {
        Header: "מחיר 1",
        accessor: "price1",
        width: "7%"
      },
      {
        Header: "מחיר 2",
        accessor: "price2",
        width: "6%"
      },
      {
        Header: "מחיר 3",
        accessor: "price3",
        width: "6%"
      },
      {
        Header: "סהכ מחיר",
        accessor: "total_price",
        width: "6%"
      },
      {
        Header: "תשלום 1",
        accessor: "payment1",
        width: "10%"
      },
      {
        Header: "תשלום 2",
        accessor: "payment2",
        width: "10%"
      },
      {
        Header: "תשלום 3",
        accessor: "payment3",
        width: "10%"
      },
      {
        Header: " תשלום (שח)",
        accessor: "payment",
        width: "15%",
      }
    ]
  //-------------------------------------------------
  const titleReport = 'דוח עונה לפי מגדל'

  const titles = [
    { titleHeb: 'שם מגדל', value: growerName },
    { titleHeb: 'עונה', value: season }

  ]


  const rowProps = (row) => ({
    style: {
      background:
        row.original.fruitType === '' && row.original.payment === '' ? 'black'
          : row.original.fruitType === '' && row.original.packingType === '' ? '#7F7E7E'
            : row.original.packingType !== '' && row.original.price1 === '' && row.original.dealName !== '' ? 'red'
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

export default SeasonReportGrower