import React, { useState } from "react";
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { addDeal } from '../../../redux/rec_fruit_actions/deals/deals_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericAddPage from '../../general_comp/GenericAddPage'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const AddDeal = (props) => {

    let copy2Deal = useSelector(state => state.deals.deal_2_Copy)

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


    //============ season =============================//

    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)


    //============ bleank record =====================//

    const blankRecord = {
        season: selected_season, fruitDeal: 0, fruitTypeID: 0, dealNameID: 0, dealName: '', fruitName: '', fruitType: '',
        price1: 0, price2: 0, price3: 0, year_from: y, month_from: m, day_from: d,
        /* year_price1: y, month_price1: m, day_price1: d  , year_price2: y, month_price2: m, day_price2: d , year_price3: y, month_price3: m, day_price3: d*/
    }


   //=============================================================================//

    let [copyDeal, setCopyDeal] = useState(copy2Deal)

    const getFirstDayofMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1)

    const currentDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())


    useEffect(() => {
        copy2Deal.length === 0 ? setCopyDeal(blankRecord) : setCopyDeal(copy2Deal)

        setSelectedFromdDate(new Date(copy2Deal.length === 0 ? currentDate : copy2Deal.fromDate))

        //========= the setSelected... is for the datepicker detailes in the FE, it doesnt efect the data in the backend (copyDeal) =========//
        setSelectedPrice1Date(new Date(copy2Deal.length === 0 || copy2Deal.price1Date === null ? getFirstDayofMonth : copy2Deal.price1Date))
        setSelectedPrice2Date(new Date(copy2Deal.length === 0 || copy2Deal.price2Date === null ? getFirstDayofMonth : copy2Deal.price2Date))
        setSelectedPrice3Date(new Date(copy2Deal.length === 0 || copy2Deal.price3Date === null ? getFirstDayofMonth : copy2Deal.price3Date))

    }, [copy2Deal])


    //========= general function =================================================//

    // contain the data we changed and update the setCopyDeal   
    const updateMyData = (columnId, value) => {
        setCopyDeal((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };

    //=============================================================================//

    const cancelBack = () => {
        props.back()
    }

    // ============================== get the fruit-Deals list=====================//

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

    // sorting the list
    uniqueFruitDealList.sort((a, b) => (a.fruitType + a.dealName > b.fruitType + b.dealName) ? 1 : -1)


    let origDealNameID = copy2Deal.dealNameID
    let origFruitTypeID = copy2Deal.fruitTypeID

    // filter the onme record in uniqueFruitDealList that matches the one in the DB (fruitTypeID & dealNameID)
    let fruitDealofRowtoEdit = uniqueFruitDealList.filter(item => parseInt(item.dealNameID) === parseInt(origDealNameID) && parseInt(item.fruitTypeID) === parseInt(origFruitTypeID))


    useEffect(() => {

        setCopyDeal({
            ...copyDeal,
            filtered: (fruitDealofRowtoEdit.length === 0 ? 'בחר' : fruitDealofRowtoEdit[0].id)
        })
    }, [])

    //=============================================================================//
    //handel list of fruitType-Deal (per user choose in drop down list)
    const handleFruitDealSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))
        if (filteredRecord.length !== 0) {
            return ({ ...copyDeal, dealNameID: filteredRecord[0].dealNameID, dealName: filteredRecord[0].dealName, fruitTypeID: filteredRecord[0].fruitTypeID, fruitName: filteredRecord[0].fruitName, fruitType: filteredRecord[0].fruitType, filtered: filteredRecord[0].id })
        }
        else {
            return ({ ...copyDeal, dealNameID: 'בחר', dealName: 'בחר', fruitTypeID: 'בחר', fruitName: 'בחר', fruitType: 'בחר', filtered: 'בחר' })
        }
    }

    //=============================================================================//
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


    //input - example: copy2Deal.fromDate==> Thu, 01 Jan 2022 00:00:00 GMT
    // output: new Date(copy2Deal.fromDate) ==> Thu Jan 01 2022 02:00:00 GMT+0200 (Israel Standard Time) - datepicker format
    // selected is for the datepicker presentation
    const [selectedFromDate, setSelectedFromdDate] = useState(handleDate(copy2Deal.fromDate))
    const [selectedPrice1Date, setSelectedPrice1Date] = useState(handleDate(copy2Deal.price1Date))
    const [selectedPrice2Date, setSelectedPrice2Date] = useState(handleDate(copy2Deal.price2Date))
    const [selectedPrice3Date, setSelectedPrice3Date] = useState(handleDate(copy2Deal.price3Date))


    // update copyDeal with the original DD, MM, YY of the dates fields (so the flask will know to set it in the DB)

    //input - example: copy2Deal.fromDate==> Thu, 01 Jan 2022 00:00:00 GMT
    // output: convertFromDatepicker_mysql((copy2Deal.fromDate)) ==> {'year': x, 'month':y, 'day': z}
    let origFromDate = convertFromDatepicker_mysql((copy2Deal.fromDate))
    let origprice1Date = convertFromDatepicker_mysql((copy2Deal.price1Date))
    let origprice2Date = convertFromDatepicker_mysql((copy2Deal.price2Date))
    let origprice3Date = convertFromDatepicker_mysql((copy2Deal.price3Date))



    // update the copyDeal  per the original dates (year, month, day)
    useEffect(() => {
        setCopyDeal({
            ...copyDeal,
            season: selected_season,
            year_from: origFromDate['year'], month_from: origFromDate['month'], day_from: origFromDate['day'],
            year_price1: origprice1Date['year'], month_price1: origprice1Date['month'], day_price1: origprice1Date['day'],
            year_price2: origprice2Date['year'], month_price2: origprice2Date['month'], day_price2: origprice2Date['day'],
            year_price3: origprice3Date['year'], month_price3: origprice3Date['month'], day_price3: origprice3Date['day'],
            filtered: (fruitDealofRowtoEdit.length === 0 ? 'בחר' : fruitDealofRowtoEdit[0].id) // added 28.9.22
        })
    }, [])


    //=============================================================================//
    // ==============  post pick of diffrent date in the Edit section  ============//

    const handelFromDatePicker = (date) => {
        setSelectedFromdDate(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setCopyDeal({ ...copyDeal, year_from: new_date_data['year'], month_from: new_date_data['month'], day_from: new_date_data['day'] })
    }

    const handelPrice1DatePicker = (date) => {
        setSelectedPrice1Date(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setCopyDeal({ ...copyDeal, year_price1: new_date_data['year'], month_price1: new_date_data['month'], day_price1: new_date_data['day'] })

    }
    const handelPrice2DatePicker = (date) => {
        setSelectedPrice2Date(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setCopyDeal({ ...copyDeal, year_price2: new_date_data['year'], month_price2: new_date_data['month'], day_price2: new_date_data['day'] })

    }
    const handelPrice3DatePicker = (date) => {
        setSelectedPrice3Date(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setCopyDeal({ ...copyDeal, year_price3: new_date_data['year'], month_price3: new_date_data['month'], day_price3: new_date_data['day'] })

    }

    //=======================================================================//
    //=======================================================================//

    const columns =
        [

            {
                Header: "מתאריך",
                accessor: "fromDate",
                // width: "11%",
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
                Header: "זן-עסקה",
                accessor: "fruitDeal",
                // width: "13%",
                Cell: () => {
                    return (
                        <select value={copyDeal.filtered} onChange={(e) => setCopyDeal(handleFruitDealSet(e.target.value, uniqueFruitDealList))}>
                            <option>בחר</option>
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
                // width: "11%",
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
                // width: "6%",
                Cell: EditableCell
            },
            {
                Header: "תאריך2",
                accessor: "price2Date",
                //width: "11%",
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
                //  width: "11%",
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
            <GenericAddPage
                addObjDB={addDeal}
                toFilter={selected_season}
                updateMyData={updateMyData}
                columns={columns}
                data={copyDeal}
                setData={setCopyDeal}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}

export default AddDeal;