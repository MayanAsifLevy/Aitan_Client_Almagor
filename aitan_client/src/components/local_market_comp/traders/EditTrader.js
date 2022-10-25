import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { updateTraderDB } from '../../../redux/local_market_actions/traders/traders_actions'
import EditableCell from '../../general_comp/EditableCell'
import GenericEditPage from "../../general_comp/GenericEditPage";

const EditTrader = (props) => {

    let updatedTrader = useSelector(state => state.traders.trader_2_update)

    // in case we cant update and we want to return the edit table to contain the original data
    const origTraderToUpdate = updatedTrader

    let [editTrader, setEditTrader] = useState(updatedTrader)


    useEffect(() => {
        setEditTrader(updatedTrader)
    }, [updatedTrader])

    // contain the data we changed and update the setEditTrader   
    const updateMyData = (columnId, value) => {
        setEditTrader((old) => {
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


    const columns =
        [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "סוחר",
                accessor: "traderName",
                Cell: EditableCell
            },
            {
                Header: "אזור",
                accessor: "area",
                Cell: EditableCell
            },
            {
                Header: "פעיל?",
                accessor: "isActive",
                Cell: row => {

                    return (
                        <div >
                            <input type="checkbox"
                                className="checkbox_is_Active"
                                defaultChecked={row.value}
                                onBlur={(event) => updateMyData(row.column.id, event.target.checked)} />
                        </div>)
                }
            }
        ]

    let message = (
        <div>
            <ul>
                <li>לא ניתן להוסיף שם סוחר הזהה לשם סוחר אחר</li>
                <li> חובה להכניס שם סוחר </li>
            </ul>
            <br />
            <div style={{ 'textAlign': 'center' }}>אנא נסו שוב</div>
        </div>)



    return (

        <div>
            <GenericEditPage
                updateObjDB={updateTraderDB}
                updateMyData={updateMyData}
                columns={columns}
                data={editTrader}
                setData={setEditTrader}
                originalData={origTraderToUpdate}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default EditTrader;