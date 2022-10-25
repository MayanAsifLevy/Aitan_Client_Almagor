import React, { useEffect, useState } from 'react'
import GenericReport from '../../GenericReport';
import moment from 'moment';

function PlotReportPerDates() {

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


  const reportType = filetersFromReport.reportType
  const plotName = filetersFromReport.plotName
  // const fromDateFilter = filetersFromReport.fromDateFilter
  const fromDateForReport = moment(filetersFromReport.fromDateForReport).format('DD-MM-YYYY')
  // const toDateFilter = filetersFromReport.toDateFilter
  const toDateForReport = moment(filetersFromReport.toDateForReport).format('DD-MM-YYYY')


  const columns =
    [
      {
        Header: "חלקה",
        accessor: "plotName",
        width: "10%"
      },
      {
        Header: "אריזה",
        accessor: "packingType",
        width: "10%"
      },
      {
        Header: "פרי",
        accessor: "fruitName",
        width: "10%"
      },
      {
        Header: "זן",
        accessor: "fruitType",
        width: "11%"
      },
      {
        Header: "ת. קבלה",
        accessor: "receivingDate",
        width: "12%"
      },
      {
        Header: "יחידות באריזה",
        accessor: "qtyInPacking",
        width: "11%"
      },
      {
        Header: "משקל ברוטו (קג) ",
        accessor: "weightBruto",
        width: "11%"
      },
      {
        Header: "משקל נטו (קג)",
        accessor: "weightNeto",
        width: "11%"
      },
      {
        Header: " משקל לתשלום (קג)",
        accessor: "total_weight_to_pay",
        width: "11%"
      }
    ]
  //-------------------------------------------------
  const titleReport = 'דוח צובר חלקות'

  const titles = [
    { titleHeb: 'חלקה', value: reportType === 'צובר חלקה' ? plotName : 'כל החלקות' },
    { titleHeb: 'מתאריך', value: fromDateForReport },
    { titleHeb: 'עד תאריך', value: toDateForReport }

  ]


  const rowProps = (row) => ({
    style: {
      background:
        row.original.fruitType === '' && row.original.packingType === '' ? '#7F7E7E'
          : row.original.packingType !== '' && row.original.fruitType === '' ? '#E8E7E2'
            : '',

      fontWeight:
        row.original.packingType === '' ? 'bold' : '',
    }
  })
  //-------------------------------------------------
  return (
    <div className='ContainerForReportOutput' >
      <GenericReport reportColumns={columns} reportdata={dataFroReport} rowPropsReports={rowProps} titles={titles} titleReport={titleReport} />

    </div>

  )
}

export default PlotReportPerDates