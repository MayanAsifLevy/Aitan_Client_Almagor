import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { addTrader } from '../../../redux/local_market_actions/traders/traders_actions'
import GenericAddPage from "../../general_comp/GenericAddPage";
import EditableCell from '../../general_comp/EditableCell'

const AddTrader = (props) => {


    const blankRecord = { traderName: '', area: '', isActive: 1 }

    let trader2Copy = useSelector(state => state.traders.trader_2_Copy)

    let [copyTrader, setCopyTrader] = useState(blankRecord)

    useEffect(() => {
        trader2Copy === '' ? setCopyTrader(blankRecord) : setCopyTrader(trader2Copy)
    }, [trader2Copy])


    const cancelBack = () => {
        props.back()
    }


    // contain the data we changed and update the setCopyTrader   
    const updateMyData = (columnId, value) => {
        setCopyTrader((old) => {
            return {
                ...old,
                [columnId]: value,
            };
        }
        );
    };


    const columns =
        [
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
            <GenericAddPage
                addObjDB={addTrader}
                updateMyData={updateMyData}
                columns={columns}
                data={copyTrader}
                setData={setCopyTrader}
                blankRecord={blankRecord}
                back={cancelBack}
                popUpMessage={message}
            />
        </div>
    )
}


export default AddTrader;