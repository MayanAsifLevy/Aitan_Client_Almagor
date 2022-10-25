import React, { useEffect, useState } from 'react'
import GenericReport from '../../GenericReport';


function SummarySeasonGrowersReport() {

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

  const season = filetersFromReport.season

  const columns =
    [
      {
        Header: "מגדל",
        accessor: "growerName",
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
  const titleReport = 'דוח מרכז עונתי מגדל'

  const titles = [
    { titleHeb: 'עונה', value: season }
  ]



  const rowProps = (row) => ({
    style: {
      background:
        row.original.payment === '' ? 'black'
          : row.original.fruitType === '' && row.original.fruitName === '' ? '#7F7E7E' // draker gray
            : row.original.fruitType === '' && row.original.growerName !== '' ? '#AFACAB'
              : row.original.fruitName !== '' && row.original.growerName === '' ? '#E8E7E2'
                : '',
      fontWeight:
        row.original.fruitType === '' && row.original.growerName !== '' ? 'bold' : '',

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

export default SummarySeasonGrowersReport