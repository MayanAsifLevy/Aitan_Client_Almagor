import React, { useEffect, useState } from 'react'
import GenericReport from '../../reports/GenericReport'
import moment from 'moment';


function DeliveryNote2prctReport() {

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



  const dateFilter = moment(filetersFromReport.deliveryDate).format('DD-MM-YYYY')
  const traderName = filetersFromReport.traderName
  const deliveryNoteNum = filetersFromReport.deliveryNoteNum

  const columns =
    [
      {
        Header: "מספר משטח",
        accessor: "palletNum",
        width: "15%"
      },
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
        Header: "גודל",
        accessor: "size",
        width: "8%"
      },
      {
        Header: "איכות",
        accessor: "quality",
        width: "8%"
      },

      {
        Header: "אריזה",
        accessor: "marketPackingType",
        width: "8%"
      },
      {
        Header: "יחידות באריזה",
        accessor: "packMatQty",
        width: "12%"
      },
      {
        Header: "משקל נטו (קג)",
        accessor: "weightNeto",
        width: "12%",
        Cell: ({ value }) => { return parseInt(value) }
      },
      {
        Header: "משקל נטו אחרי הפחתת 2% (קג)",
        accessor: "weightNetoLess2prct",
        width: "45%",
        Cell: ({ value }) => { return parseInt(value) }
      }
    ]


/******************************************************************************/
  const titleReport = 'תעודת משלוח פנימית'

  const titles = [
    { titleHeb: 'מספר תעודת משלוח', value: deliveryNoteNum },
    { titleHeb: 'שם סוחר', value: traderName },
    { titleHeb: 'תאריך משלוח', value: dateFilter }


  ]


  const rowProps = (row) => ({
    style: {
      background:
        row.original.palletNum.includes('סהכ') ? '#7F7E7E' : '',

      fontWeight:
        row.original.palletNum.includes('סהכ') ? 'bold' : ''
       
    }
  })
/******************************************************************************/
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

export default DeliveryNote2prctReport