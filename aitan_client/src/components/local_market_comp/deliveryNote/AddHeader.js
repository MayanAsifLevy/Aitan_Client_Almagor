import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { addHeader } from '../../../redux/local_market_actions/deliveryNote/deliveryNote_actions'
import { loadTraders } from '../../../redux/local_market_actions/traders/traders_actions'
import GenericAddPage from "../../general_comp/GenericAddPage"
import EditableCell from '../../general_comp/EditableCell'
import GenericListCreator from "../../general_comp/GenericListCreator";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const AddHeader = (props) => {


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

    let traderPrcnt_value = useSelector(state => state.general.traderPrcnt)
    let distributerPrcnt_value = useSelector(state => state.general.distributerPrcnt)
    let VAT_value = useSelector(state => state.general.VAT)
    //************************************************************************************************ */

    const blankRecord = { season: selected_season, deliveryNoteNum: '-', traderID: 0, traderPrcnt: traderPrcnt_value, distributerPrcnt: distributerPrcnt_value, VAT: VAT_value, year: y, month: m, day: d }

    let [copyHeader, setCopyHeader] = useState(blankRecord)
    let header2Copy = useSelector(state => state.deliveryNote.deliveryNoteHeader_2_Copy)


    //************************************************************************************************ */
    let _token = useSelector(state => state.login.Token.token)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadTraders(_token))

    }, [])

    let traderList = useSelector(state => state.traders.traders)
    //************************************************************************************************ */

    useEffect(() => {
        header2Copy === '' ? setCopyHeader(blankRecord) : setCopyHeader(header2Copy)

    }, [header2Copy])



    const cancelBack = () => {
        props.back()
    }


    //****************************************************************************** */
    //**********************  for the dropDown lists  ****************************** */



    let traderIsActiveList = GenericListCreator(traderList)

    const handleTraderListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String

        if (filteredRecord.length !== 0) {
            setCopyHeader({ ...copyHeader, traderID: filteredRecord[0].id, traderName: filteredRecord[0].traderName })
        }
        else {
            setCopyHeader({ ...copyHeader, traderID: 'בחר', traderName: 'בחר' })
        }
    }

    //****************************************************************************** */

    // contain the data we changed and update the setCopyHeader   
    const updateMyData = (columnId, value) => {
        setCopyHeader((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };

    //******************************************************************************/
    //*****  To get the day, year, month fort  the copyHeader that will go to teh flask *******************************/


    let [selectedDate, setSelectedDate] = useState(new Date(header2Copy.deliveryDate).toString() === 'Invalid Date' ? new Date() : new Date(header2Copy.deliveryDate))

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
        setCopyHeader({ ...copyHeader, year: new_date_data['year'], month: new_date_data['month'], day: new_date_data['day'] })
    }


    if (selectedDate === new Date()) {
        handelDatePicker(selectedDate)
    }


    /******************************************************************************/
    /******************************************************************************/

    const columns =
        [
            {
                Header: "עונה",
                accessor: "season",
                width: '10%'
            },
            {
                Header: "מספר תעודת משלוח",
                accessor: "deliveryNoteNum",
                width: '10%',
                Cell: EditableCell
            },
            {
                Header: "ת. תעודת משלוח",
                accessor: "deliveryDate",
                width: '20%',
                Cell: () => {

                    return (
                        <DatePicker className="datepicker"
                            selected={selectedDate}
                            seasonFilter={selected_season}
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
                Header: 'סוחר',
                accessor: "traderName",
                width: '20%',
                Cell: () => {

                    return (

                        <select value={copyHeader.traderID} onChange={(e) => handleTraderListSet(e.target.value, traderIsActiveList)}>
                            <option>בחר</option>
                            {traderIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.traderName} </option>
                            ))}
                        </select>
                    )
                }

            },
            {
                Header: "% עמלת סוחר",
                accessor: "traderPrcnt",
                width: '10%',
                Cell: EditableCell
            },
            {
                Header: "% עמלת משווק",
                accessor: "distributerPrcnt",
                width: '10%',
                Cell: EditableCell
            },
            {
                Header: "מעמ",
                accessor: "VAT",
                width: '10%',
                Cell: EditableCell
            },
        ]


    let message = (
        <div>
            <ul>
                <li>עונה + מספר משטח חייבים להיות יחודיים</li>
                <li>חובה להכניס מספר משטח וסוג משטח</li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)


    const tableName = 'יצירת תעודת משלוח'


    return (

        <div>
            <GenericAddPage
                addObjDB={addHeader}
                toFilter={selected_season}
                updateMyData={updateMyData}
                columns={columns}
                data={copyHeader}
                setData={setCopyHeader}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
                pageName={tableName}

            />

        </div>
    )
}


export default AddHeader;