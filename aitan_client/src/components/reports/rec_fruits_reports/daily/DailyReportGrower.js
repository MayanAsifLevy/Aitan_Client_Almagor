import React, { useEffect, useState } from 'react'
import GenericReport from '../../GenericReport';
import moment from 'moment';


function DailyReportGrower() {

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


  const dateFilter = moment(filetersFromReport.dateForReport).format('DD-MM-YYYY')
  const growerName = filetersFromReport.growerName


  const columns =
    [
      {
        Header: "פרי",
        accessor: "fruitName",
        width: "10%"
      },
      {
        Header: "זן",
        accessor: "fruitType",
        width: "15%"
      },

      {
        Header: "אריזה",
        accessor: "packingType",
        width: "15%"
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
      }
    ]


  //-------------------------------------------------
  const titleReport = 'דוח יומי לפי מגדל'

  const titles = [
    { titleHeb: 'תאריך', value: dateFilter },
    { titleHeb: 'שם מגדל', value: growerName }

  ]


  const rowProps = (row) => ({
    style: {
      background:
        row.original.weightBruto === '' ? 'black'
          : row.original.fruitType === '' && row.original.packingType === '' ? '#7F7E7E'
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

export default DailyReportGrower