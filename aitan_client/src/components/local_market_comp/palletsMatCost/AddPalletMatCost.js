import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addPalletMatCost } from '../../../redux/local_market_actions/palletsMatCost/palletsMatCost_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const AddPalletMatCost = (props) => {


    let palletMatCost2Copy = useSelector(state => state.palletsMatCost.palletMatCost_2_Copy)

    // ================  in case we cant update and we want to return the edit table to contain the original data ================//
    // ===== get current date in case for blankRecord =====// 
    const monthToNum = {
        'Jan': 1,
        'Feb': 2,
        'Mar': 3,
        'Apr': 4,
        'May': 5,
        'Jun': 6,
        'Jul': 7,
        'Aug': 8,
        'Sep': 9,
        'Oct': 10,
        'Nov': 11,
        'Dec': 12
    }


    let newDate = new Date().toString()
    let y = parseInt(newDate.substring(11, 15))
    let m = monthToNum[newDate.substring(4, 7)]
    let d = parseInt(newDate.substring(8, 10))

    //============ palletMatID =============================//

    let matrecordSelected = useSelector(state => state.palletsMat.savePalletMat4cost)
    let matIDSelected = matrecordSelected.id


    //============ bleank record =====================//

    const blankRecord = { palletMatID: matrecordSelected.id, palletMatType: matrecordSelected.palletType, year_from: y, month_from: m, day_from: d, year_to: y, month_to: m, day_to: d, palletMatCost: 0 }

    //===============================================//


    let [copyPalletMatCost, setCopyPalletMatCost] = useState(palletMatCost2Copy.length === 0 ? blankRecord : palletMatCost2Copy)


    //============ general function =====================//
    // contain the data we changed and update the setCopyPalletMatCost   
    const updateMyData = (columnId, value) => {
        setCopyPalletMatCost((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };
    //===============================================//
    const cancelBack = () => {
        props.back()
    }

    // ======================  for the Dates fields  =============================//

    const convertFromDatepicker_mysql = (date) => {

        if (date !== null && date !== undefined) {
            let strDate = new Date(date.toString())
            let new_date = {}
            new_date['day'] = parseInt('' + strDate.getDate())
            new_date['month'] = parseInt('' + (strDate.getMonth() + 1))
            new_date['year'] = strDate.getFullYear()

            return (new_date)
        }
        else {
            return { 'day': 0, 'month': 0, 'year': 0 }
        }
    }


    const handleDate = (date) => {
        // convert date to string in required format ('DD-MM-YYYY')
        if (date !== undefined) {
            return new Date(date)
        }
        else {
            return new Date()
        }

    }


    //input - example: palletMatCost2Copy.fromDate==> Thu, 01 Jan 2022 00:00:00 GMT
    // output: new Date(palletMatCost2Copy.fromDate) ==> Thu Jan 01 2022 02:00:00 GMT+0200 (Israel Standard Time) - datepicker format
    // selected is for the datepicker presentation
    const [selectedFromDate, setSelectedFromdDate] = useState(handleDate(palletMatCost2Copy.fromDate))
    const [selectedToDate, setSelectedToDate] = useState(handleDate(palletMatCost2Copy.toDate))


    // update palletMatCost2Copy with the original DD, MM, YY of the dates fields (so the flask will know to set it in the DB)

    //input - example: palletMatCost2Copy.fromDate==> Thu, 01 Jan 2022 00:00:00 GMT
    // output: convertFromDatepicker_mysql((copy2Deal.fromDate)) ==> {'year': x, 'month':y, 'day': z}
    let origFromDate = convertFromDatepicker_mysql((palletMatCost2Copy.fromDate))
    let origToDate = convertFromDatepicker_mysql((palletMatCost2Copy.toDate))



    // update the copyDeal  per the original dates (year, month, day)
    useEffect(() => {
        setCopyPalletMatCost({
            ...copyPalletMatCost,
            year_from: origFromDate['year'], month_from: origFromDate['month'], day_from: origFromDate['day'],
            year_to: origToDate['year'], month_to: origToDate['month'], day_to: origToDate['day']


        })

    }, [])
    //=============================================================================//
    // ==============  post pick of diffrent date in the Edit section  ============//

    const handelFromDatePicker = (date) => {
        setSelectedFromdDate(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setCopyPalletMatCost({ ...copyPalletMatCost, year_from: new_date_data['year'], month_from: new_date_data['month'], day_from: new_date_data['day'] })
    }

    const handelToDatePicker = (date) => {
        setSelectedToDate(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setCopyPalletMatCost({ ...copyPalletMatCost, year_to: new_date_data['year'], month_to: new_date_data['month'], day_to: new_date_data['day'] })

    }
    //=============================================================================//

    const columns =
        [
            {
                Header: "סוג משטח",
                accessor: "palletMatType",
                width: "20%"
            },
            {
                Header: "מתאריך",
                accessor: "fromDate",
                //width: "8%",
                Cell: () => {

                    return (
                        <DatePicker
                            selected={selectedFromDate}
                            onChange={date => handelFromDatePicker(date)}
                            placeholderText={'dd-MM-yyyy'}
                            dateFormat='dd-MM-yyyy'
                            yearDropdownItemNumber={10}
                            scrollableYearDropdown={true}
                            showYearDropdown


                        />
                    )
                }
            },
            {
                Header: "עד תאריך",
                accessor: "toDate",
                //width: "8%",
                Cell: () => {

                    return (
                        <DatePicker
                            selected={selectedToDate}
                            onChange={date => handelToDatePicker(date)}
                            placeholderText={'dd-MM-yyyy'}
                            dateFormat='dd-MM-yyyy'
                            yearDropdownItemNumber={10}
                            scrollableYearDropdown={true}
                            showYearDropdown


                        />
                    )
                }
            },
            {
                Header: "עלות משטח",
                accessor: "palletMatCost",
                // width: "20%",
                Cell: EditableCell
            }
        ]

    let message = (
        <div>
            <ul>
                <li>לא ניתן להוסיף מחירים על תאריכים חופפים</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    return (

        <div>
            <GenericAddPage
                addObjDB={addPalletMatCost}
                toFilter={matIDSelected}
                updateMyData={updateMyData}
                columns={columns}
                data={copyPalletMatCost}
                setData={setCopyPalletMatCost}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default AddPalletMatCost;