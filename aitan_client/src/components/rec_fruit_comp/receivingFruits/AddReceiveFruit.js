import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addReceivingFruit } from '../../../redux/rec_fruit_actions/receivingFruits/receivingFruits_actions';
import { loadPackingMaterials } from '../../../redux/rec_fruit_actions/packingMaterial/packingMaterial_actions'
import { loadDealNames } from '../../../redux/rec_fruit_actions/dealNames/dealNames_actions'
import { loadFruits } from '../../../redux/rec_fruit_actions/fruits/fruits_actions'
import { loadGrowers } from '../../../redux/rec_fruit_actions/growers/growers_actions'
import { loadpackingHouses } from '../../../redux/rec_fruit_actions/packingHouse/packingHouse_actions'
import { loadPlots } from '../../../redux/rec_fruit_actions/plotDunam/plotsDunam_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import GenericListCreator from "../../general_comp/GenericListCreator";
import EditableCell from '../../general_comp/EditableCell'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'


const AddReceiveFruits = (props) => {

    let _token = useSelector(state => state.login.Token.token)

    //********************** get current date in case for blankRecord ****************************** */
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

    //************************************************************************************************ */

    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

    //************************************************************************************************ */

    const blankRecord = { season: selected_season, growerID: 0, deliverNote: '', packingHouseID: 0, plotID: 0, fruitTypeID: 0, dealNameID: 0, packingMaterialID: 0, qtyInPacking: 0, weightBruto: 0, year: y, month: m, day: d }


    let [copyReceivingFruit, setCopyReceivingFruit] = useState(blankRecord)

    let receivingFruit2Copy = useSelector(state => state.receivingFruits.receivingFruit_2_Copy)

    const dispatch = useDispatch()

    let fruitTypesList = useSelector(state => state.fruits.fruits)
    let dealNamesList = useSelector(state => state.dealNames.dealNames)
    let growersList = useSelector(state => state.growers.growers)
    let packingHousesList = useSelector(state => state.packingHouse.packingHouses)
    let packingMaterialsList = useSelector(state => state.packingMaterials.packingMaterials)
    let plotsList = useSelector(state => state.plotsDunam.plots)

    useEffect(() => {
        // must check if we already brought the data from store and if we did, we dont need to do it again
        if (dealNamesList.length === 0) { dispatch(loadDealNames(_token)) }
        if (packingMaterialsList.length === 0) dispatch(loadPackingMaterials(_token))
        if (fruitTypesList.length === 0) { dispatch(loadFruits(_token)) }
        if (growersList.length === 0) { dispatch(loadGrowers(_token)) }
        if (packingHousesList.length === 0) { dispatch(loadpackingHouses(_token)) }
        dispatch(loadPlots(selected_season, _token)) 
    }, [])



    useEffect(() => {

        receivingFruit2Copy === '' ? setCopyReceivingFruit(blankRecord) : setCopyReceivingFruit(receivingFruit2Copy)

    }, [receivingFruit2Copy])


    //****************************************************************************** */
    //**********************  for the dropDown lists  ****************************** */


    let packingIsActiveList = GenericListCreator(packingHousesList)

    const handlePackingHouseListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String

        if (filteredRecord.length !== 0) {
            setCopyReceivingFruit({ ...copyReceivingFruit, packingHouseID: filteredRecord[0].id, packingHouseName: filteredRecord[0].packingHouseName })
        }
        else {
            setCopyReceivingFruit({ ...copyReceivingFruit, packingHouseID: '??????', packingHouseName: '??????' })
        }
    }

    /**************************************************** */

    let growerIsActiveList = GenericListCreator(growersList)

    const handleGrowersListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))

        if (filteredRecord.length !== 0) {
            setCopyReceivingFruit({ ...copyReceivingFruit, growerID: filteredRecord[0].id, growerName: filteredRecord[0].growerName })
        }
        else {
            setCopyReceivingFruit({ ...copyReceivingFruit, growerID: '??????', growerName: '??????' })
        }
    }

    /**************************************************** */
    let plotIsActiveList = GenericListCreator(plotsList)

    const handlePlotsListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))

        if (filteredRecord.length !== 0) {
            setCopyReceivingFruit({ ...copyReceivingFruit, plotID: filteredRecord[0].id, plotName: filteredRecord[0].plotName, fruitTypeID: filteredRecord[0].fruitTypeID, fruitType: filteredRecord[0].fruitType })
        }
        else {
            setCopyReceivingFruit({ ...copyReceivingFruit, plotID: '??????', plotName: '??????' , fruitTypeID: '??????', fruitName: '??????', fruitType: '??????' })
        }
    }

    /**************************************************** */
    // let fruitTypeIsActiveLList = GenericListCreator(fruitTypesList)

    // const handleFruitsListSet = (optionID, list) => {
    //     let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))
    //     if (filteredRecord.length !== 0) {
    //         setCopyReceivingFruit({ ...copyReceivingFruit, fruitTypeID: filteredRecord[0].id, fruitName: filteredRecord[0].fruitName, fruitType: filteredRecord[0].fruitType })
    //     }
    //     else {
    //         setCopyReceivingFruit({ ...copyReceivingFruit, fruitTypeID: '??????', fruitName: '??????', fruitType: '??????' })
    //     }
    // }

    /**************************************************** */
    let dealNameIsActiveLList = GenericListCreator(dealNamesList)

    const handleDealNameListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))

        if (filteredRecord.length !== 0) {
            setCopyReceivingFruit({ ...copyReceivingFruit, dealNameID: filteredRecord[0].id, dealName: filteredRecord[0].dealName })
        }
        else {
            setCopyReceivingFruit({ ...copyReceivingFruit, dealNameID: '??????', dealName: '??????' })
        }
    }

    /**************************************************** */
    let packingMatIsActiveLList = GenericListCreator(packingMaterialsList)

    const handlePackingMatListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID))

        if (filteredRecord.length !== 0) {
            setCopyReceivingFruit({ ...copyReceivingFruit, packingMaterialID: filteredRecord[0].id, packingType: filteredRecord[0].packingType })
        }
        else {
            setCopyReceivingFruit({ ...copyReceivingFruit, packingMaterialID: '??????', packingType: '??????' })
        }
    }


    //******************************************************************************/
    //**********************  *******************************/

    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyReceivingFruit   
    const updateMyData = (columnId, value) => {
        setCopyReceivingFruit((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };

    /******************************************************************************/
    //**********************  To get the day, year, month fort  the copyReceivingFruit that will go to teh flask *******************************/


    let [selectedDate, setSelectedDate] = useState(new Date(receivingFruit2Copy.receivingDate).toString() === 'Invalid Date' ? new Date() : new Date(receivingFruit2Copy.receivingDate))

    function convertFromDatepicker_mysql(str) {
        let new_date = {}
        new_date['month'] = monthToNum[str.substring(4, 7)]
        new_date['day'] = parseInt(str.substring(8, 10))
        new_date['year'] = parseInt(str.substring(11, 15))
        return (new_date)
    }

    const handelDatePicker = (date) => {
        setSelectedDate(date)
        let new_date_data = convertFromDatepicker_mysql(date.toString())
        setCopyReceivingFruit({ ...copyReceivingFruit, year: new_date_data['year'], month: new_date_data['month'], day: new_date_data['day'] })
    }


    if (selectedDate === new Date()) {
        handelDatePicker(selectedDate)
    }


    /******************************************************************************/
    /******************************************************************************/

    const columns =
        [
            {
                Header: "??. ????????",
                accessor: "receivingDate",
                Cell: () => {

                    return (
                        <DatePicker className="datepicker"
                            selected={selectedDate}
                            onChange={date => handelDatePicker(date)}
                            placeholderText={'dd-MM-yyyy'}
                            dateFormat='dd-MM-yyyy'
                            yearDropdownItemNumber={10}
                            showYearDropdown
                            scrollableYearDropdown
                        />
                    )
                }
            },
            {
                Header: "????????",
                accessor: "season",
                Cell: EditableCell
            },
            {
                Header: '??????"??',
                accessor: "packingHouseName",
                Cell: () => {
                    return (

                        <select value={copyReceivingFruit.packingHouseID} onChange={(e) => handlePackingHouseListSet(e.target.value, packingIsActiveList)}>
                            <option>??????</option>
                            {packingIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.packingHouseName} | {option.location}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "????????",
                accessor: "growerName",
                Cell: () => {

                    return (

                        <select value={copyReceivingFruit.growerID} onChange={(e) => handleGrowersListSet(e.target.value, growerIsActiveList)}>
                            <option>??????</option>
                            {growerIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.growerName}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "??. ??????????",
                accessor: "deliverNote",
                Cell: EditableCell
            },
            {
                Header: "????????-????",
                accessor: "plotName",
                Cell: () => {

                    return (

                        <select value={copyReceivingFruit.plotID} onChange={(e) => handlePlotsListSet(e.target.value, plotIsActiveList)}>
                            <option>??????</option>
                            {plotIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.plotName}  | {option.fruitType}</option>
                            ))}
                        </select>
                    )
                }
            },
            // {
            //     Header: "????",
            //     accessor: "fruitType",
            //     Cell: () => {

            //         return (

            //             <select value={copyReceivingFruit.fruitTypeID} onChange={(e) => handleFruitsListSet(e.target.value, fruitTypeIsActiveLList)}>
            //                 <option>??????</option>
            //                 {fruitTypeIsActiveLList.map((option) => (
            //                     <option key={option.id} value={option.id}>{option.fruitType} | {option.fruitName}</option>
            //                 ))}
            //             </select>
            //         )
            //     }
            // },
            {
                Header: "????????",
                accessor: "dealName",
                Cell: () => {

                    return (

                        <select value={copyReceivingFruit.dealNameID} onChange={(e) => handleDealNameListSet(e.target.value, dealNameIsActiveLList)}>
                            <option>??????</option>
                            {dealNameIsActiveLList.map((option) => (
                                <option key={option.id} value={option.id}>{option.dealName}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "??????????",
                accessor: "packingType",
                Cell: () => {

                    return (

                        <select value={copyReceivingFruit.packingMaterialID} onChange={(e) => handlePackingMatListSet(e.target.value, packingMatIsActiveLList)}>
                            <option>??????</option>
                            {packingMatIsActiveLList.map((option) => (
                                <option key={option.id} value={option.id}>{option.packingType}</option>
                            ))}
                        </select>
                    )
                }
            },
            {
                Header: "????' ??????????",
                accessor: "qtyInPacking",
                Cell: EditableCell
            },
            {
                Header: "???????? ??????????",
                accessor: "weightBruto",
                Cell: EditableCell
            }
        ]

    /******************************************************************************/
    /******************************************************************************/

    let message = (
        <div>
            <ul>
                <li>???? ???????? ???? ???? ??????????</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>?????? ?????? ??????</div>

        </div>)


    return (

        <div>
            <GenericAddPage
                addObjDB={addReceivingFruit}
                toFilter={selected_season}
                updateMyData={updateMyData}
                columns={columns}
                data={copyReceivingFruit}
                setData={setCopyReceivingFruit}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default AddReceiveFruits;