import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { updateDealDB } from '../../../redux/rec_fruit_actions/deals/deals_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from '../../general_comp/GenericEditPage'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const EditDeal = (props) => {


    let updatedDeal = useSelector(state => state.deals.deal_2_update)

    // as we filter the data of deals for only the current seasson - we need to provide this data to the updateDealDB in genericEdit page
    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

    // in case we cant update and we want to return the edit table to contain the original data


    let [origDealToUpdate, setOrigDealToUpdate] = useState(updatedDeal)
    let [editDeal, setEditDeal] = useState(updatedDeal)

    const getFirstDayofMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)


    useEffect(() => {
        setEditDeal(updatedDeal)
        setSelectedFromdDate(new Date(updatedDeal.fromDate))

        // the setSelected... is for the datepicker detailes in the FE, it doesnt efect the data in the backend (editDeal) 
        setSelectedPrice1Date(new Date(updatedDeal.price1Date === null ? getFirstDayofMonth : updatedDeal.price1Date))
        setSelectedPrice2Date(new Date(updatedDeal.price2Date === null ? getFirstDayofMonth : updatedDeal.price2Date))
        setSelectedPrice3Date(new Date(updatedDeal.price3Date === null ? getFirstDayofMonth : updatedDeal.price3Date))


    }, [updatedDeal])


    // ==================== general functions ====================//

    // contain the data we changed and update the setEditDeal   
    const updateMyData = (columnId, value) => {

        setEditDeal((old) => {
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

    // ==================== get the fruit-Deals list ====================//


    // this was read from the DB on the "Deals".js
    let receivingFruitsList = useSelector(state => state.receivingFruits.receivingFruits)


    // get only several fileds from receivingFruitsList (in order to find the unique fruit-deal)
    let list_fruitDeal = []
    let filtered_dic = {}
    let index = 0
    receivingFruitsList.forEach(item => {
        filtered_dic = {}
        filtered_dic['id'] = index
        filtered_dic['dealNameID'] = item.dealNameID
        filtered_dic['dealName'] = item.dealName
        filtered_dic['fruitTypeID'] = item.fruitTypeID
        filtered_dic['fruitName'] = item.fruitName
        filtered_dic['fruitType'] = item.fruitType

        index = index + 1
        list_fruitDeal.push(filtered_dic)

    })


    //leave only the unique dicts from list_fruitDeal
    const uniqueFruitDealList = list_fruitDeal.filter((o, i) =>
        i === list_fruitDeal.findIndex(oo => o.dealNameID === oo.dealNameID && o.fruitTypeID === oo.fruitTypeID)
    );

    uniqueFruitDealList.sort((a, b) => (a.fruitType + a.dealName > b.fruitType + b.dealName) ? 1 : -1)

    let origDealNameID = updatedDeal.dealNameID
    let origFruitTypeID = updatedDeal.fruitTypeID

    // filter the one record in uniqueFruitDealList that matches the one in the DB (fruitTypeID & dealNameID)
    let fruitDealofRowtoEdit = uniqueFruitDealList.filter(item => parseInt(item.dealNameID) === parseInt(origDealNameID) && parseInt(item.fruitTypeID) === parseInt(origFruitTypeID))


    //=================================================//
    //handel list of fruitType-Deal (per user choose in drop down list)
    const handleFruitDealSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))

        return ({ ...editDeal, dealNameID: filteredRecord[0].dealNameID, dealName: filteredRecord[0].dealName, fruitTypeID: filteredRecord[0].fruitTypeID, fruitName: filteredRecord[0].fruitName, fruitType: filteredRecord[0].fruitType, filtered: filteredRecord[0].id })
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


    //input - example: updatedDeal.fromDate==> Thu, 01 Jan 2022 00:00:00 GMT
    // output: new Date(updatedDeal.fromDate) ==> Thu Jan 01 2022 02:00:00 GMT+0200 (Israel Standard Time) - datepicker format
    // selected is for the datepicker presentation
    const [selectedFromDate, setSelectedFromdDate] = useState(handleDate(updatedDeal.fromDate))
    const [selectedPrice1Date, setSelectedPrice1Date] = useState(handleDate(updatedDeal.price1Date))
    const [selectedPrice2Date, setSelectedPrice2Date] = useState(handleDate(updatedDeal.price2Date))
    const [selectedPrice3Date, setSelectedPrice3Date] = useState(handleDate(updatedDeal.price3Date))


    // update editDeal with the original DD, MM, YY of the dates fields (so the flask will know to set it in the DB)

    //input - example: updatedDeal.fromDate==> Thu, 01 Jan 2022 00:00:00 GMT
    // output: convertFromDatepicker_mysql((updatedDeal.fromDate)) ==> {'year': x, 'month':y, 'day': z}
    let origFromDate = convertFromDatepicker_mysql((updatedDeal.fromDate))
    let origprice1Date = convertFromDatepicker_mysql((updatedDeal.price1Date))
    let origprice2Date = convertFromDatepicker_mysql((updatedDeal.price2Date))
    let origprice3Date = convertFromDatepicker_mysql((updatedDeal.price3Date))

    // update the editDeal & origDealToUpdate per the original dates (year, month, day)
    useEffect(() => {
        setEditDeal({
            ...editDeal,
            year_from: origFromDate['year'], month_from: origFromDate['month'], day_from: origFromDate['day'],
            year_price1: origprice1Date['year'], month_price1: origprice1Date['month'], day_price1: origprice1Date['day'],
            year_price2: origprice2Date['year'], month_price2: origprice2Date['month'], day_price2: origprice2Date['day'],
            year_price3: origprice3Date['year'], month_price3: origprice3Date['month'], day_price3: origprice3Date['day'],
            filtered: fruitDealofRowtoEdit[0].id
        }, [])

        setOrigDealToUpdate({
            ...origDealToUpdate,
            year_from: origFromDate['year'], month_from: origFromDate['month'], day_from: origFromDate['day'],
            year_price1: origprice1Date['year'], month_price1: origprice1Date['month'], day_price1: origprice1Date['day'],
            year_price2: origprice2Date['year'], month_price2: origprice2Date['month'], day_price2: origprice2Date['day'],
            year_price3: origprice3Date['year'], month_price3: origprice3Date['month'], day_price3: origprice3Date['day'],
            filtered: fruitDealofRowtoEdit[0].id
        })

    }, [])


    //============================================================================//
    //=============== post pick of diffrent date in the Edit section ============//


    const handelFromDatePicker = (date) => {
        setSelectedFromdDate(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setEditDeal({ ...editDeal, year_from: new_date_data['year'], month_from: new_date_data['month'], day_from: new_date_data['day'] })
    }

    const handelPrice1DatePicker = (date) => {
        setSelectedPrice1Date(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setEditDeal({ ...editDeal, year_price1: new_date_data['year'], month_price1: new_date_data['month'], day_price1: new_date_data['day'] })

    }
    const handelPrice2DatePicker = (date) => {
        setSelectedPrice2Date(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setEditDeal({ ...editDeal, year_price2: new_date_data['year'], month_price2: new_date_data['month'], day_price2: new_date_data['day'] })

    }
    const handelPrice3DatePicker = (date) => {
        setSelectedPrice3Date(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setEditDeal({ ...editDeal, year_price3: new_date_data['year'], month_price3: new_date_data['month'], day_price3: new_date_data['day'] })

    }

    //==============================================//
    //=============================================//

    const columns =
        [
            {
                Header: "ID",
                accessor: "id",
                //  width: "5%"
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
                Header: "עונה",
                accessor: "season",
                // width: "5%",
                Cell: EditableCell
            },
            {
                Header: "זן-עסקה",
                accessor: "fruitDeal",
                // width: "13%",
                Cell: () => {
                    return (
                        <select value={editDeal.filtered} onChange={(e) => setEditDeal(handleFruitDealSet(e.target.value, uniqueFruitDealList))}>
                            {uniqueFruitDealList.map((option) => (
                                <option key={option.id} value={option.id}>{option.fruitType} | {option.dealName}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "מחיר1",
                accessor: "price1",
                // width: "6%",
                Cell: EditableCell
            },
            {
                Header: "תאריך1",
                accessor: "price1Date",
                //width: "11%",
                tipText: "filter format: 08 Aug 2022",
                Cell: () => {

                    return (
                        <DatePicker
                            selected={selectedPrice1Date}
                            onChange={date => handelPrice1DatePicker(date)}
                            placeholderText={'dd-MM-yyyy'}
                            dateFormat='dd-MM-yyyy'
                            yearDropdownItemNumber={70}
                            showYearDropdown
                            scrollableYearDropdown
                        />
                    )
                }
            },
            {
                Header: "מחיר2",
                accessor: "price2",
                //width: "6%",
                Cell: EditableCell
            },
            {
                Header: "תאריך2",
                accessor: "price2Date",
                // width: "11%",
                tipText: "filter format: 08 Aug 2022",
                Cell: () => {

                    return (
                        <DatePicker
                            selected={selectedPrice2Date}
                            onChange={date => handelPrice2DatePicker(date)}
                            placeholderText={'dd-MM-yyyy'}
                            dateFormat='dd-MM-yyyy'
                            yearDropdownItemNumber={70}
                            showYearDropdown
                            scrollableYearDropdown
                        />
                    )
                }
            },
            {
                Header: "מחיר3",
                accessor: "price3",
                // width: "6%",
                Cell: EditableCell
            },
            {
                Header: "תאריך3",
                accessor: "price3Date",
                //width: "11%",
                tipText: "filter format: 08 Aug 2022",
                Cell: () => {

                    return (
                        <DatePicker
                            selected={selectedPrice3Date}
                            onChange={date => handelPrice3DatePicker(date)}
                            placeholderText={'dd-MM-yyyy'}
                            yearDropdownItemNumber={70}
                            dateFormat='dd-MM-yyyy'
                            showYearDropdown
                            scrollableYearDropdown
                        />
                    )
                }
            }
        ]


    let message = (
        <div>
            <ul>
                <li>רשומה בעלת מתאריך + עומה + זן + עסקה לא יכולה להיות זהה לרשומה אחרת</li>
                <li>יש להכניס לכל רשומה מחיר ותאריך הכנסתו</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    return (
        <div>
            <GenericEditPage
                updateObjDB={updateDealDB}
                toFilter={selected_season}
                updateMyData={updateMyData}
                columns={columns}
                data={editDeal}
                setData={setEditDeal}
                originalData={origDealToUpdate}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}

export default EditDeal;