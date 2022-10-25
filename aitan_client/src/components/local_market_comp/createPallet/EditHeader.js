import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateHeaderDB } from '../../../redux/local_market_actions/createPallet/createPallet_actions';
import { loadPalletsMat } from '../../../redux/local_market_actions/palletsMat/palletsMat_actions'
import GenericListCreator from "../../general_comp/GenericListCreator";
import EditableCell from '../../general_comp/EditableCell';
import GenericEditPage from "../../general_comp/GenericEditPage";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from "moment";

const EditCreatePalletHeader = (props) => {

    //************************************************************************************************ */
    let selected_season = useSelector(state => state.general.season)
    selected_season = (selected_season === '' ? new Date().getFullYear() : selected_season)

    //************************************************************************************************ */

    let updatedHeader = useSelector(state => state.createPallet.createPalletHeader_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    const origHeaderToUpdate = updatedHeader

    let [editHeader, setEditHeader] = useState(updatedHeader)


    useEffect(() => {
        setEditHeader(updatedHeader)
        setSelectedDate(new Date(updatedHeader.packingDate))
    }, [updatedHeader])

    // contain the data we changed and update the setEditTrader   
    const updateMyData = (columnId, value) => {
        setEditHeader((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };

    //************************************************************************************************ */
    const cancelBack = () => {
        props.back()
    }
    //************************************************************************************************ */

    let _token = useSelector(state => state.login.Token.token)

    const dispatch = useDispatch()

    useEffect(() => {
        // must check if we already brought the data from store and if we did, we dont need to do it again
        dispatch(loadPalletsMat(_token))

    }, [])

    let palletMatList = useSelector(state => state.palletsMat.palletsMat)

    //****************************************************************************** */
    //**********************  for the dropDown lists  ****************************** */

    let palletMatIsActiveList = GenericListCreator(palletMatList)

    const handlePalletMatListSet = (optionID, list) => {
        let filteredRecord = list.filter((item) => parseInt(item.id) === parseInt(optionID)) // parseInt as==> item.id =Number while optionID = String

        if (filteredRecord.length !== 0) {
            setEditHeader({ ...editHeader, palletMatID: filteredRecord[0].id, palletMatType: filteredRecord[0].palletType })
        }
        else {
            setEditHeader({ ...editHeader, palletMatID: 'בחר', palletMatType: 'בחר' })
        }
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

    const [selectedDate, setSelectedDate] = useState(handleDate(updatedHeader.packingDate))


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
        setEditHeader({ ...editHeader, year: new_date_data['year'], month: new_date_data['month'], day: new_date_data['day'] })
    }

    //******************************************************************************/
    const columns =
        [
            {
                Header: "ID",
                accessor: "id",
                width: '10%'
            },
            {
                Header: "עונה",
                accessor: "season",
                width: '10%'
            },
            {
                Header: "מספר משטח",
                accessor: "palletNum",
                width: '10%',
                Cell: EditableCell
            },
            {
                Header: 'סוג משטח',
                accessor: "palletMatType",
                width: '20%',
                Cell: () => {

                    return (

                        <select value={editHeader.palletMatID} onChange={(e) => handlePalletMatListSet(e.target.value, palletMatIsActiveList)}>
                            <option>בחר</option>
                            {palletMatIsActiveList.map((option) => (
                                <option key={option.id} value={option.id}>{option.palletType} </option>
                            ))}
                        </select>
                    )
                }

            },
            {
                Header: "ת. אריזה",
                accessor: "packingDate",
                width: '5%',
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
                Header: "הערות",
                accessor: "palletRemarks",
                width: '20%',
                Cell: EditableCell
            }
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

    const tableName = 'עריכת משטח'



    return (

        <div>
            <GenericEditPage

                updateObjDB={updateHeaderDB}
                toFilter={selected_season}
                updateMyData={updateMyData}
                columns={columns}
                data={editHeader}
                setData={setEditHeader}
                originalData={origHeaderToUpdate}
                back={cancelBack}
                popUpMessage={message}
                pageName={tableName}
            />
        </div>
    )
}

export default EditCreatePalletHeader;