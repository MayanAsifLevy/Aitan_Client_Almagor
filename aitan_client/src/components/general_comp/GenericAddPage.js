import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import Popup from './popUps/Popup'
import TableChanges from './TableChanges'
import PopupAdd from './popUps/PopUp_AddData'
import './genericUpdatePageStyle.css'
import 'react-datepicker/dist/react-datepicker.css'


const GenericAddPage = (props) => {

    const dispatch = useDispatch()

    const [popUp, setPopUp] = useState(false)
    const [popUpAddData, setPopUpAddData] = useState(false)

    const _token= useSelector(state=> state.login.Token.token)


    const cancelBack = () => {
        props.back()
    }


    const AddIsDone = () => {
        props.setData(props.blankRecord) //after the add, the field change to blankRecord
        cancelBack()
    }


    const isseuAdding = () => {
        setPopUp(!popUp)
    }


    const submitAddObj = (e) => {
        e.preventDefault();
        let action2Dispatch = ''
        if (props.toFilter !== undefined) {
            action2Dispatch = props.addObjDB(props.data, props.toFilter, _token)
        }
        else {
            action2Dispatch = props.addObjDB(props.data, _token)
        }
        dispatch(action2Dispatch).then(function (result) {
            return (
                result === 'issueWithRecord' || result === 'issueWithFieldData' ? isseuAdding() : AddIsDone()
            )
        })
    }


    const columns = props.columns
    const data = props.data


    //in case we need to add more data to list of ADD TABLE (like add fruitName)
    const back_AddMoreData = () => {
        setPopUpAddData(!popUpAddData)
    }


    let [newVal, setNewVal] = useState('')
    const handleAddChange = (e) => {
        setNewVal(e.target.value)
    }

    const handelPopUpCancel = () => {
        setPopUpAddData(!popUpAddData)
    }

    const ObjUniqueList = props.canAdd2List

    const handleAddNew = () => {
        ObjUniqueList.push(newVal)
        const updatedUniqueList = [...new Set(ObjUniqueList)]
        dispatch(props.addMore2UniqueList(updatedUniqueList))
        setPopUpAddData(!popUpAddData)
    }

        // check if we want to present the 'הוסף' button in the AddPage
        let presentAddSign=true
        if (props.showAddSign!== undefined)
        {
           if( props.showAddSign)
                {presentAddSign=true}
           else
                {presentAddSign=false}
        } 
                                  
       

    return (
        <div>
            {/* ========= add table name ========== */}
            <div className="tableName tableNameAction">
                {props.pageName}
            </div>


            <form className="Edit_form" onSubmit={e => submitAddObj(e)}>
                <div className='tableData_changes'>
                    <TableChanges
                        columns={columns}
                        data={[data]}
                        updateMyData={props.updateMyData}
                        back_AddMore={back_AddMoreData} />

                    <div className="editButtons_container">
                       {presentAddSign? <button className='editButton' type="submit">הוסף</button>:''}
                        <button type="button" className='editButton' onClick={cancelBack}>בטל </button>
                    </div>
                </div>
            </form>


            <Popup trigger={popUp} setTrigger={setPopUp}>
                <div className='popupMessage'> {props.popUpMessage} </div>
            </Popup>


            <PopupAdd trigger={popUpAddData} setTrigger={setPopUpAddData}>
                <span className='popupMessage'>{props.title}:</span> <input type='text' onChange={(e) => { handleAddChange(e) }} />
                <div className='popupMessage'> האם לשמור את נתון?</div>
                <div className='bottomButtons'>
                    <button className='buttons' onClick={handleAddNew}> שמור </button>
                    <button className='buttons' onClick={handelPopUpCancel}> בטל </button>
                </div>
            </PopupAdd>
        </div>
    )
}

export default GenericAddPage;