import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Popup from './popUps/Popup'
import TableChanges from './TableChanges'
import './genericUpdatePageStyle.css'
import 'react-datepicker/dist/react-datepicker.css'

const GenericEditPage = (props) => {

    const dispatch = useDispatch()

    const [popUp, setPopUp] = useState(false)

    const _token= useSelector(state=> state.login.Token.token)


    const cancelBack = () => {
        props.back()
    }


    const isseuUpdate = () => {
        props.setData(props.originalData)
        setPopUp(!popUp)
    }


    const updateIsDone = () => {
        cancelBack()
    }


    const submitUpdateObj = (e) => {
        e.preventDefault();
        let action2Dispatch = ''
        if (props.toFilter !== undefined) {
            action2Dispatch = props.updateObjDB(props.data, props.toFilter, _token)
        }
        else {
            action2Dispatch = props.updateObjDB(props.data, _token)
        }

        dispatch(action2Dispatch).then(function (result) {
            return (

                result === 'issueWithRecord' || result === 'issueWithFieldData' ? isseuUpdate() : updateIsDone()
            )
        })
    }


    const columns = props.columns
    const data = props.data


    return (

        <div >
            {/* ========= add table name ========== */}
            <div className="tableName tableNameAction">
                    {props.pageName}
                </div>

            <form className="Edit_form" onSubmit={e => submitUpdateObj(e)}>

                
                <div className='tableData_changes'>
                    <div>
                        <TableChanges
                            columns={columns}
                            data={[data]}
                            updateMyData={props.updateMyData} />
                    </div>
                    <div className="editButtons_container">
                        <button className="editButton" type="submit">עדכן</button>
                        <button type="button" className="editButton" onClick={cancelBack}>בטל </button>
                    </div>
                </div>

            </form>


            <Popup trigger={popUp} setTrigger={setPopUp}>
                <div className='popupMessage'> {props.popUpMessage} </div>
            </Popup>

        </div>
    )

}

export default GenericEditPage;