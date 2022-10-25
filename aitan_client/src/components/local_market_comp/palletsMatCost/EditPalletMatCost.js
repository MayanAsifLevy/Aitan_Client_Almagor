import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updatePalletMatCostDB } from '../../../redux/local_market_actions/palletsMatCost/palletsMatCost_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const EditPalletMatCost = (props) => {


    let matrecordSelected = useSelector(state => state.palletsMat.savePalletMat4cost)
    // let matIDSelected=matrecordSelected['palletMatID']
    let matIDSelected = matrecordSelected.id

    let updatedPalletMatCost = useSelector(state => state.palletsMatCost.palletMatCost_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    let [origPalletMatCostToUpdate, setOrigPalletMatCostToUpdate] = useState(updatedPalletMatCost)

    let [editPalletMatCost, setEditPalletMatCost] = useState(updatedPalletMatCost)


    useEffect(() => {
        setEditPalletMatCost(updatedPalletMatCost)
        setSelectedFromdDate(new Date(updatedPalletMatCost.fromDate))
        setSelectedToDate(new Date(updatedPalletMatCost.toDate))
    }, [updatedPalletMatCost])


    useEffect(() => {
        setEditPalletMatCost(updatedPalletMatCost)
    }, [updatedPalletMatCost])

    // contain the data we changed and update the setEditPalletMatCost   
    const updateMyData = (columnId, value) => {
        setEditPalletMatCost((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };


    const cancelBack = () => {
        props.back()
    }
    //============================================================================//
    //====================== for the Dates fields ===============================//


    const convertFromDatepicker_mysql = (date) => {

        if (date !== null && date !== undefined) {
            let strDate = new Date(date.toString())
            let new_date = {}
            new_date['day'] = '' + strDate.getDate()
            new_date['month'] = '' + (strDate.getMonth() + 1)
            new_date['year'] = strDate.getFullYear();

            return (new_date)
        }
        else {
            return { 'day': 0, 'month': 0, 'year': '0' }
        }
    }


    const handleDate = (date) => {
        // convert date to string in required format ('DD-MM-YYYY')
        if (date !== undefined) {
            // const fromDate_var = moment(new Date(date).toISOString()).utc().format('DD-MM-YYYY')
            return new Date(date)
        }
        else {
            return new Date()
        }

    }

    // update editDeal with the original DD, MM, YY of the dates fields (so the flask will know to set it in the DB)

    //input - example: updatedPalletMatCost.fromDate==> Thu, 01 Jan 2022 00:00:00 GMT
    // output: convertFromDatepicker_mysql((updatedPalletMatCost.fromDate)) ==> {'year': x, 'month':y, 'day': z}
    let origFromDate = convertFromDatepicker_mysql((updatedPalletMatCost.fromDate))
    let origToDate = convertFromDatepicker_mysql((updatedPalletMatCost.toDate))

    //input - example: updatedDeal.fromDate==> Thu, 01 Jan 2022 00:00:00 GMT
    // output: new Date(updatedDeal.fromDate) ==> Thu Jan 01 2022 02:00:00 GMT+0200 (Israel Standard Time) - datepicker format
    // selected is for the datepicker presentation
    const [selectedFromDate, setSelectedFromdDate] = useState(handleDate(updatedPalletMatCost.fromDate))
    const [selectedtoDate, setSelectedToDate] = useState(handleDate(updatedPalletMatCost.toDate))

    // update the editDeal & origDealToUpdate per the original dates (year, month, day)
    useEffect(() => {
        setEditPalletMatCost({
            ...editPalletMatCost,
            year_from: origFromDate['year'], month_from: origFromDate['month'], day_from: origFromDate['day'],
            year_to: origToDate['year'], month_to: origToDate['month'], day_to: origToDate['day'],


        }, [])

        setOrigPalletMatCostToUpdate({
            ...origPalletMatCostToUpdate,
            year_from: origFromDate['year'], month_from: origFromDate['month'], day_from: origFromDate['day'],
            year_to: origToDate['year'], month_to: origToDate['month'], day_to: origToDate['day']
        })

    }, [])

    //============================================================================//
    //=============== post pick of diffrent date in the Edit section ============//


    const handelFromDatePicker = (date) => {
        setSelectedFromdDate(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setEditPalletMatCost({ ...editPalletMatCost, year_from: new_date_data['year'], month_from: new_date_data['month'], day_from: new_date_data['day'] })
    }

    const handelToDatePicker = (date) => {
        setSelectedToDate(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setEditPalletMatCost({ ...editPalletMatCost, year_to: new_date_data['year'], month_to: new_date_data['month'], day_to: new_date_data['day'] })
    }


    const columns =
        [
            {
                Header: "ID",
                accessor: "id",
                //  width: "10%"
            },
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
                            selected={selectedtoDate}
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
                <li>חובה להכניס סוג משטח</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)



    return (

        <div>
            <GenericEditPage
                updateObjDB={updatePalletMatCostDB}
                toFilter={matIDSelected}
                updateMyData={updateMyData}
                columns={columns}
                data={editPalletMatCost}
                setData={setEditPalletMatCost}
                originalData={origPalletMatCostToUpdate}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default EditPalletMatCost;