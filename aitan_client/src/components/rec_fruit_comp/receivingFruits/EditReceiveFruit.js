import React, { useState } from "react";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateReceivingFruitDB } from '../../../redux/rec_fruit_actions/receivingFruits/receivingFruits_actions';
import { loadPackingMaterials } from '../../../redux/rec_fruit_actions/packingMaterial/packingMaterial_actions'
import { loadDealNames } from '../../../redux/rec_fruit_actions/dealNames/dealNames_actions'
import { loadFruits } from '../../../redux/rec_fruit_actions/fruits/fruits_actions'
import { loadGrowers } from '../../../redux/rec_fruit_actions/growers/growers_actions'
import { loadpackingHouses } from '../../../redux/rec_fruit_actions/packingHouse/packingHouse_actions'
import { loadPlots } from '../../../redux/rec_fruit_actions/plots/plots_actions'
import GenericEditPage from "../../general_comp/GenericEditPage";
import GenericListCreator from "../../general_comp/GenericListCreator";
import EditableCell from '../../general_comp/EditableCell'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";


const EditeceiveFruits = (props) => {

    let _token = useSelector(state => state.login.Token.token)

    const dispatch = useDispatch()

    let fruitTypesList = useSelector(state => state.fruits.fruits)
    let dealNamesList = useSelector(state => state.dealNames.dealNames)
    let growersList = useSelector(state => state.growers.growers)
    let packingHousesList = useSelector(state => state.packingHouse.packingHouses)
    let packingMaterialsList = useSelector(state => state.packingMaterials.packingMaterials)
    let plotsList = useSelector(state => state.plots.plots)

    useEffect(() => {
        // must check if we already brought the data from store and if we did, we dont need to do it again
        if (dealNamesList.length === 0) { dispatch(loadDealNames(_token)) }
        if (packingMaterialsList.length === 0) dispatch(loadPackingMaterials(_token))
        if (fruitTypesList.length === 0) { dispatch(loadFruits(_token)) }
        if (growersList.length === 0) { dispatch(loadGrowers(_token)) }
        if (packingHousesList.length === 0) { dispatch(loadpackingHouses(_token)) }
        if (plotsList.length === 0) { dispatch(loadPlots(_token)) }
    }, [])

    // as we filter the data of deals for only the current seasson - we need to provide this data to the updateDealDB in genericEdit page
    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

    let updateReceivingFruit = useSelector(state => state.receivingFruits.receivingFruit_2_update)

    // in case we cant update (as the record uniquenes is violated) and we want to return the edit table to contain the original data
    let origReceivingFruitToUpdate = updateReceivingFruit


    let [editReceivingFruit, setEditReceivingFruit] = useState(updateReceivingFruit)


    useEffect(() => {
        setEditReceivingFruit(updateReceivingFruit)
        setSelectedDate(new Date(updateReceivingFruit.receivingDate)) // in case the use wont select any date 

    }, [updateReceivingFruit])


    // contain the data we changed and update the setEditReceivingFruit   
    const updateMyData = (columnId, value) => {
        setEditReceivingFruit((old) => {
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


    //****************************************************************************** */
    //**********************  for the dropDown lists  ****************************** */


    let packingIsActiveList = GenericListCreator(packingHousesList)

    const handlePackingHouseListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String
        setEditReceivingFruit({ ...editReceivingFruit, packingHouseID: filteredRecord[0].id, packingHouseName: filteredRecord[0].packingHouseName })
    }

    /**************************************************** */

    let growerIsActiveList = GenericListCreator(growersList)

    const handleGrowersListSet = (optionID, list) => {

        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))
        setEditReceivingFruit({ ...editReceivingFruit, growerID: filteredRecord[0].id, growerName: filteredRecord[0].growerName })
    }

    /**************************************************** */
    let plotIsActiveList = GenericListCreator(plotsList)

    const handlePlotsListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))
        setEditReceivingFruit({ ...editReceivingFruit, plotID: filteredRecord[0].id, plotName: filteredRecord[0].plotName })
    }

    /**************************************************** */
    let fruitTypeIsActiveLList = GenericListCreator(fruitTypesList)

    const handleFruitsListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))
        setEditReceivingFruit({ ...editReceivingFruit, fruitTypeID: filteredRecord[0].id, fruitName: filteredRecord[0].fruitName, fruitType: filteredRecord[0].fruitType })
    }

    /**************************************************** */
    let dealNameIsActiveLList = GenericListCreator(dealNamesList)

    const handleDealNameListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))
        setEditReceivingFruit({ ...editReceivingFruit, dealNameID: filteredRecord[0].id, dealName: filteredRecord[0].dealName })
    }

    /**************************************************** */
    let packingMatIsActiveLList = GenericListCreator(packingMaterialsList)

    const handlePackingMatListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))
        setEditReceivingFruit({ ...editReceivingFruit, packingMaterialID: filteredRecord[0].id, packingType: filteredRecord[0].packingType })
    }


    //******************************************************************************/
    //**********************  for the receivingDate  *******************************/

    const handleDate = (date) => {
        // convert date to string in required format ('DD-MM-YYYY')
        if (date !== undefined) {
            const fromDate_var = moment(new Date(date).toISOString()).utc().format('DD-MM-YYYY')
            //01-01-1970 meaning there was no date
            return fromDate_var !== '01-01-1970' ? new Date(date) : ''
        }
        else {
            return ''
        }
    }


    const [selectedDate, setSelectedDate] = useState(handleDate(updateReceivingFruit.receivingDate))


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


    const handelDatePicker = (date) => {
        setSelectedDate(date)
        let new_date_data = convertFromDatepicker_mysql(date)
        setEditReceivingFruit({ ...editReceivingFruit, year: new_date_data['year'], month: new_date_data['month'], day: new_date_data['day'] })
    }

    //**************************************************** */
    //***************************************************

    const columns =
        [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "ת. קבלה",
                accessor: "receivingDate",
                Cell: () => {

                    return (
                        <div className="customDatePickerWidth">
                            <DatePicker
                                wrapperClassName="customDatePickerWidth"
                                selected={selectedDate}
                                onChange={date => handelDatePicker(date)}
                                placeholderText={'dd-MM-yyyy'}
                                dateFormat='dd-MM-yyyy'
                                yearDropdownItemNumber={10}
                                showYearDropdown
                                scrollableYearDropdown
                            />
                        </div>
                    )

                }
            },
            {
                Header: "עונה",
                accessor: "season",
                Cell: EditableCell
            },
            {
                Header: 'ביא"ר',
                accessor: "packingHouseName",
                Cell: () => {

                    return (

                        <select value={editReceivingFruit.packingHouseID} onChange={(e) => handlePackingHouseListSet(e.target.value, packingIsActiveList)}>
                            {packingIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.packingHouseName} | {option.location}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "מגדל",
                accessor: "growerName",
                Cell: () => {

                    return (

                        <select value={editReceivingFruit.growerID} onChange={(e) => handleGrowersListSet(e.target.value, growerIsActiveList)}>
                            {growerIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.growerName}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "ת. משלוח",
                accessor: "deliverNote",
                Cell: EditableCell
            },
            {
                Header: "חלקה",
                accessor: "plotName",
                Cell: () => {
                    return (

                        <select value={editReceivingFruit.plotID} onChange={(e) => handlePlotsListSet(e.target.value, plotIsActiveList)}>
                            {plotIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.plotName}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "זן",
                accessor: "fruitType",
                Cell: () => {
                    return (

                        <select value={editReceivingFruit.fruitTypeID} onChange={(e) => handleFruitsListSet(e.target.value, fruitTypeIsActiveLList)}>
                            {fruitTypeIsActiveLList.map((option) => (
                                <option key={option.id} value={option.id}>{option.fruitType}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "עסקה",
                accessor: "dealName",
                Cell: () => {
                    return (

                        <select value={editReceivingFruit.dealNameID} onChange={(e) => handleDealNameListSet(e.target.value, dealNameIsActiveLList)}>
                            {dealNameIsActiveLList.map((option) => (
                                <option key={option.id} value={option.id}>{option.dealName}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "אריזה",
                accessor: "packingType",
                Cell: () => {
                    return (

                        <select value={editReceivingFruit.packingMaterialID} onChange={(e) => handlePackingMatListSet(e.target.value, packingMatIsActiveLList)}>
                            {packingMatIsActiveLList.map((option) => (
                                <option key={option.id} value={option.id}>{option.packingType}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "יח' אריזה",
                accessor: "qtyInPacking",
                Cell: EditableCell
            },
            {
                Header: "משקל ברוטו",
                accessor: "weightBruto",
                Cell: EditableCell
            }
        ]


    let message = (
        <div>
            <ul>
                <li>ישנה בעיה באחד השדות</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    return (

        <div>
            <GenericEditPage
                updateObjDB={updateReceivingFruitDB}
                toFilter={selected_season}
                updateMyData={updateMyData}
                columns={columns}
                data={editReceivingFruit}
                setData={setEditReceivingFruit}
                originalData={origReceivingFruitToUpdate}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default EditeceiveFruits;